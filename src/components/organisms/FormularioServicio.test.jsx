import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioServicio from './FormularioServicio'

const categorias = ['Consulta', 'Prevención']
const servicio = {
  id: 2,
  codigo: 'PRE-001',
  nombre: 'Vacunación',
  categoria: 'Prevención',
  especie: 'Perro y gato',
  duracion: 20,
  precio: 15000,
  oferta: false,
  precioOferta: null,
  observaciones: 'Incluye carnet.',
  imagen: '/Imagenes/Vacunacion.jpg',
}

describe('FormularioServicio', () => {
  it('muestra los errores y NO avisa a la página si está vacío', async () => {
    const onEnviar = vi.fn()
    render(<FormularioServicio categorias={categorias} onEnviar={onEnviar} />)

    await userEvent.click(screen.getByRole('button', { name: /crear servicio/i }))

    expect(screen.getAllByRole('alert').length).toBeGreaterThan(5)
    expect(onEnviar).not.toHaveBeenCalled()
  })

  it('al editar, parte con los datos del servicio y el botón dice "Guardar cambios"', () => {
    render(<FormularioServicio servicio={servicio} categorias={categorias} onEnviar={() => {}} />)

    expect(screen.getByLabelText('Nombre')).toHaveValue('Vacunación')
    expect(screen.getByLabelText('Precio')).toHaveValue('15000')
    expect(screen.getByRole('button', { name: /guardar cambios/i })).toBeInTheDocument()
  })

  it('entrega los números ya convertidos cuando todo es válido', async () => {
    const onEnviar = vi.fn()
    render(<FormularioServicio servicio={servicio} categorias={categorias} onEnviar={onEnviar} />)

    await userEvent.click(screen.getByRole('button', { name: /guardar cambios/i }))

    expect(onEnviar).toHaveBeenCalledWith(
      expect.objectContaining({ nombre: 'Vacunación', precio: 15000, duracion: 20, oferta: false, precioOferta: null }),
    )
  })

  it('muestra el campo de precio de oferta solo si se marca la casilla', async () => {
    render(<FormularioServicio servicio={servicio} categorias={categorias} onEnviar={() => {}} />)
    expect(screen.queryByLabelText('Precio de oferta')).not.toBeInTheDocument()

    await userEvent.click(screen.getByLabelText('Servicio en oferta'))

    expect(screen.getByLabelText('Precio de oferta')).toBeInTheDocument()
  })

  it('rechaza una oferta mayor que el precio normal', async () => {
    const onEnviar = vi.fn()
    render(<FormularioServicio servicio={servicio} categorias={categorias} onEnviar={onEnviar} />)

    await userEvent.click(screen.getByLabelText('Servicio en oferta'))
    await userEvent.type(screen.getByLabelText('Precio de oferta'), '20000')
    await userEvent.click(screen.getByRole('button', { name: /guardar cambios/i }))

    expect(screen.getByRole('alert')).toHaveTextContent('menor que el precio normal')
    expect(onEnviar).not.toHaveBeenCalled()
  })
})