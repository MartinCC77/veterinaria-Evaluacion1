import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TablaServiciosAdmin from './TablaServiciosAdmin'

const servicios = [
  { id: 1, codigo: 'CON-001', nombre: 'Consulta general', categoria: 'Consulta', precio: 18000, oferta: false, precioOferta: null },
  { id: 2, codigo: 'PRE-001', nombre: 'Vacunación', categoria: 'Prevención', precio: 15000, oferta: true, precioOferta: 12000 },
]

describe('TablaServiciosAdmin', () => {
  it('muestra una fila por servicio con su precio vigente', () => {
    render(<TablaServiciosAdmin servicios={servicios} onEditar={() => {}} onEliminar={() => {}} />)

    expect(screen.getByText('Consulta general')).toBeInTheDocument()
    expect(screen.getByText(/\$12\.000/)).toBeInTheDocument()
  })

  it('avisa qué servicio se quiere editar', async () => {
    const onEditar = vi.fn()
    render(<TablaServiciosAdmin servicios={servicios} onEditar={onEditar} onEliminar={() => {}} />)

    await userEvent.click(screen.getAllByRole('button', { name: 'Editar' })[0])

    expect(onEditar).toHaveBeenCalledWith(servicios[0])
  })

  it('pide confirmación antes de eliminar y NO elimina todavía', async () => {
    const onEliminar = vi.fn()
    render(<TablaServiciosAdmin servicios={servicios} onEditar={() => {}} onEliminar={onEliminar} />)

    await userEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[0])

    expect(screen.getByText(/¿Eliminar "Consulta general"\?/)).toBeInTheDocument()
    expect(onEliminar).not.toHaveBeenCalled()
  })

  it('elimina al confirmar', async () => {
    const onEliminar = vi.fn()
    render(<TablaServiciosAdmin servicios={servicios} onEditar={() => {}} onEliminar={onEliminar} />)

    await userEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[0])
    await userEvent.click(screen.getByRole('button', { name: 'Sí, eliminar' }))

    expect(onEliminar).toHaveBeenCalledWith(servicios[0])
  })

  it('no elimina si se cancela', async () => {
    const onEliminar = vi.fn()
    render(<TablaServiciosAdmin servicios={servicios} onEditar={() => {}} onEliminar={onEliminar} />)

    await userEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[0])
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))

    expect(onEliminar).not.toHaveBeenCalled()
  })
})