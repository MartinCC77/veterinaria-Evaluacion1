import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TablaCategoriasAdmin from './TablaCategoriasAdmin'

const categorias = [
  { nombre: 'Consulta', cantidad: 2 },
  { nombre: 'Cirugía', cantidad: 0 },
]

describe('TablaCategoriasAdmin', () => {
  it('muestra cada categoría con su cantidad de servicios', () => {
    render(<TablaCategoriasAdmin categorias={categorias} onRenombrar={() => ({ ok: true })} />)

    expect(screen.getByText('Consulta')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('al editar, abre el formulario con el nombre actual', async () => {
    render(<TablaCategoriasAdmin categorias={categorias} onRenombrar={() => ({ ok: true })} />)

    await userEvent.click(screen.getAllByRole('button', { name: 'Editar' })[0])

    expect(screen.getByLabelText('Nuevo nombre para "Consulta"')).toHaveValue('Consulta')
  })

  it('renombra y cierra el formulario cuando todo sale bien', async () => {
    const onRenombrar = vi.fn(() => ({ ok: true }))
    render(<TablaCategoriasAdmin categorias={categorias} onRenombrar={onRenombrar} />)

    await userEvent.click(screen.getAllByRole('button', { name: 'Editar' })[0])
    const campo = screen.getByLabelText('Nuevo nombre para "Consulta"')
    await userEvent.clear(campo)
    await userEvent.type(campo, 'Consultas')
    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))

    expect(onRenombrar).toHaveBeenCalledWith('Consulta', 'Consultas')
    expect(screen.queryByLabelText('Nuevo nombre para "Consulta"')).not.toBeInTheDocument()
  })

  it('muestra el error y deja abierto el formulario si el nombre ya existe', async () => {
    const onRenombrar = vi.fn(() => ({ ok: false, error: 'Ya existe una categoría con ese nombre' }))
    render(<TablaCategoriasAdmin categorias={categorias} onRenombrar={onRenombrar} />)

    await userEvent.click(screen.getAllByRole('button', { name: 'Editar' })[1])
    const campo = screen.getByLabelText('Nuevo nombre para "Cirugía"')
    await userEvent.clear(campo)
    await userEvent.type(campo, 'Consulta')
    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))

    expect(screen.getByText('Ya existe una categoría con ese nombre')).toBeInTheDocument()
    expect(screen.getByLabelText('Nuevo nombre para "Cirugía"')).toBeInTheDocument()
  })
})