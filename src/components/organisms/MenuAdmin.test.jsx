import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MenuAdmin from './MenuAdmin'

const enlaces = [
  { ruta: '/admin', texto: 'Dashboard' },
  { ruta: '/admin/servicios', texto: 'Servicios' },
]

describe('MenuAdmin', () => {
  it('marca como activo el enlace de la página actual', () => {
    render(<MenuAdmin enlaces={enlaces} rutaActual="/admin/servicios" onNavegar={() => {}} />)

    expect(screen.getByText('Servicios')).toHaveClass('active')
    expect(screen.getByText('Dashboard')).not.toHaveClass('active')
  })

  it('marca el enlace padre cuando estás en una subpágina', () => {
    render(<MenuAdmin enlaces={enlaces} rutaActual="/admin/servicios/nuevo" onNavegar={() => {}} />)
    expect(screen.getByText('Servicios')).toHaveClass('active')
  })

  it('llama a onNavegar con la ruta al hacer clic', async () => {
    const onNavegar = vi.fn()
    render(<MenuAdmin enlaces={enlaces} rutaActual="/admin" onNavegar={onNavegar} />)

    await userEvent.click(screen.getByText('Servicios'))

    expect(onNavegar).toHaveBeenCalledWith('/admin/servicios')
  })
})