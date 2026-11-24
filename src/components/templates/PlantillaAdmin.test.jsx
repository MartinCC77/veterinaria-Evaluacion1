import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PlantillaAdmin from './PlantillaAdmin'
import { AuthProvider } from '../../context/AuthContext'
import { guardarSesion } from '../../services/sesionService'

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
    localStorage.clear()
  })

  it('sin sesión muestra "Acceso restringido" y no el contenido', () => {
    dibujar()
    expect(screen.getByText('Acceso restringido')).toBeInTheDocument()
    expect(screen.queryByText('Contenido del panel')).not.toBeInTheDocument()
  })

  it('un dueño de mascota no puede entrar al panel', () => {
    guardarSesion(3) 
    dibujar()
    expect(screen.getByText('Acceso restringido')).toBeInTheDocument()
  })

  it('el administrador ve el contenido y todo el menú', () => {
    guardarSesion(1) 
    dibujar(true)
    expect(screen.getByText('Contenido del panel')).toBeInTheDocument()
    expect(screen.getByText('Usuarios')).toBeInTheDocument()
  })

  it('la recepcionista ve el contenido pero no el menú de Usuarios', () => {
    guardarSesion(2) 
    dibujar()
    expect(screen.getByText('Contenido del panel')).toBeInTheDocument()
    expect(screen.queryByText('Usuarios')).not.toBeInTheDocument()
  })

  it('la recepcionista no puede entrar a una página solo del administrador', () => {
    guardarSesion(2)
    dibujar(true)
    expect(screen.getByText('Esta sección es solo para el administrador.')).toBeInTheDocument()
    expect(screen.queryByText('Contenido del panel')).not.toBeInTheDocument()
  })
})