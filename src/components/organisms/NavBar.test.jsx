import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NavBar from './NavBar'

const enlaces = [
  { ruta: '/', texto: 'Inicio' },
  { ruta: '/servicios', texto: 'Servicios' },
]

describe('NavBar', () => {
  it('sin sesión muestra Ingresar y Registrarse', () => {
    render(<NavBar enlaces={enlaces} rutaActual="/" onNavegar={() => {}} />)

    expect(screen.getByText('Ingresar')).toBeInTheDocument()
    expect(screen.getByText('Registrarse')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Salir' })).not.toBeInTheDocument()
  })

  it('con sesión muestra el saludo y el botón Salir', () => {
    render(<NavBar enlaces={enlaces} rutaActual="/" onNavegar={() => {}} usuario={{ nombre: 'Juan Pérez' }} />)

    expect(screen.getByText('Hola, Juan Pérez')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Salir' })).toBeInTheDocument()
    expect(screen.queryByText('Ingresar')).not.toBeInTheDocument()
  })

  it('llama a onNavegar con la ruta al hacer clic en un enlace', async () => {
    const onNavegar = vi.fn()
    render(<NavBar enlaces={enlaces} rutaActual="/" onNavegar={onNavegar} />)

    await userEvent.click(screen.getByText('Servicios'))

    expect(onNavegar).toHaveBeenCalledWith('/servicios')
  })

  it('llama a onCerrarSesion al presionar Salir', async () => {
    const onCerrarSesion = vi.fn()
    render(
      <NavBar enlaces={enlaces} rutaActual="/" onNavegar={() => {}} usuario={{ nombre: 'Ana' }} onCerrarSesion={onCerrarSesion} />,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Salir' }))

    expect(onCerrarSesion).toHaveBeenCalledTimes(1)
  })
})