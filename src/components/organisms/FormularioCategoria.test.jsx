import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioCategoria from './FormularioCategoria'

describe('FormularioCategoria', () => {
  it('muestra el error y NO avisa si el nombre está vacío', async () => {
    const onEnviar = vi.fn()
    render(<FormularioCategoria onEnviar={onEnviar} />)

    await userEvent.click(screen.getByRole('button', { name: 'Agregar' }))

    expect(screen.getByRole('alert')).toHaveTextContent('obligatorio')
    expect(onEnviar).not.toHaveBeenCalled()
  })

  it('avisa con el nombre sin espacios sobrantes', async () => {
    const onEnviar = vi.fn()
    render(<FormularioCategoria onEnviar={onEnviar} />)

    await userEvent.type(screen.getByLabelText('Nombre de la categoría'), '  Estética ')
    await userEvent.click(screen.getByRole('button', { name: 'Agregar' }))

    expect(onEnviar).toHaveBeenCalledWith('Estética')
  })

  it('parte con el valor inicial y muestra el error general que entrega la página', () => {
    render(<FormularioCategoria onEnviar={() => {}} valorInicial="Consulta" errorGeneral="Ya existe una categoría con ese nombre" />)

    expect(screen.getByLabelText('Nombre de la categoría')).toHaveValue('Consulta')
    expect(screen.getByText('Ya existe una categoría con ese nombre')).toBeInTheDocument()
  })

  it('muestra el botón Cancelar solo si recibe onCancelar', async () => {
    const onCancelar = vi.fn()
    const { rerender } = render(<FormularioCategoria onEnviar={() => {}} />)
    expect(screen.queryByRole('button', { name: 'Cancelar' })).not.toBeInTheDocument()

    rerender(<FormularioCategoria onEnviar={() => {}} onCancelar={onCancelar} />)
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))

    expect(onCancelar).toHaveBeenCalledTimes(1)
  })
})