import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PlantillaAdmin from './PlantillaAdmin'
import { AuthProvider } from '../../context/AuthContext'
import { guardarSesion } from '../../services/sesionService'

// Usuarios de prueba: tal como los devuelve la API (sin contraseña)
const ADMIN = { id: 1, nombre: 'Administrador', correo: 'admin@sanmarcos.cl', rol: 'administrador' }
const RECEPCION = { id: 2, nombre: 'Recepcionista', correo: 'recepcion@sanmarcos.cl', rol: 'recepcionista' }
const DUENO = { id: 3, nombre: 'Juan Pérez', correo: 'juan@correo.cl', rol: 'dueno' }

// Un token falso con vencimiento dentro de una hora (o antes, si se indica).
// El frontend solo lee el "exp"; la firma la verifica el backend.
function crearToken(segundos = 3600) {
  const payload = btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + segundos }))
  return `cabecera.${payload}.firma`
}

function iniciarComo(usuario, segundos = 3600) {
  guardarSesion({ token: crearToken(segundos), usuario })
}

function dibujar(soloAdministrador = false) {
  render(
    <MemoryRouter initialEntries={['/admin']}>
      <AuthProvider>
        <PlantillaAdmin soloAdministrador={soloAdministrador}>
          <p>Contenido del panel</p>
        </PlantillaAdmin>
      </AuthProvider>
    </MemoryRouter>,
  )
}

describe('PlantillaAdmin', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('sin sesión muestra "Acceso restringido" y no el contenido', () => {
    dibujar()
    expect(screen.getByText('Acceso restringido')).toBeInTheDocument()
    expect(screen.queryByText('Contenido del panel')).not.toBeInTheDocument()
  })

  it('un dueño de mascota no puede entrar al panel', () => {
    iniciarComo(DUENO)
    dibujar()
    expect(screen.getByText('Acceso restringido')).toBeInTheDocument()
  })

  it('el administrador ve el contenido y todo el menú', () => {
    iniciarComo(ADMIN)
    dibujar(true)
    expect(screen.getByText('Contenido del panel')).toBeInTheDocument()
    expect(screen.getByText('Usuarios')).toBeInTheDocument()
  })

  it('la recepcionista ve el contenido pero no el menú de Usuarios', () => {
    iniciarComo(RECEPCION)
    dibujar()
    expect(screen.getByText('Contenido del panel')).toBeInTheDocument()
    expect(screen.queryByText('Usuarios')).not.toBeInTheDocument()
  })

  it('la recepcionista no puede entrar a una página solo del administrador', () => {
    iniciarComo(RECEPCION)
    dibujar(true)
    expect(screen.getByText('Esta sección es solo para el administrador.')).toBeInTheDocument()
    expect(screen.queryByText('Contenido del panel')).not.toBeInTheDocument()
  })

  it('un token vencido se descarta y se trata como sin sesión', () => {
    iniciarComo(ADMIN, -60)
    dibujar()
    expect(screen.getByText('Acceso restringido')).toBeInTheDocument()
  })
})
