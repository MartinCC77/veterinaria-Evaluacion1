import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TarjetaServicio from './TarjetaServicio'

const servicio = {
  id: 2,
  nombre: 'Vacunación',
  especie: 'Perro y gato',
  precio: 15000,
  duracion: 20,
  observaciones: 'Incluye carnet.',
  imagen: '/Imagenes/Vacunas.jpg',
}

describe('TarjetaServicio', () => {
  it('muestra el nombre y el precio formateado', () => {
    render(<TarjetaServicio servicio={servicio} onSolicitar={() => {}} />)

    expect(screen.getByText('Vacunación')).toBeInTheDocument()
    expect(screen.getByText(/\$15\.000/)).toBeInTheDocument()
  })

  it('avisa al padre con el servicio elegido al hacer clic', async () => {
    const onSolicitar = vi.fn()
    render(<TarjetaServicio servicio={servicio} onSolicitar={onSolicitar} />)

    await userEvent.click(screen.getByRole('button', { name: /solicitar cita/i }))

    expect(onSolicitar).toHaveBeenCalledTimes(1)
    expect(onSolicitar).toHaveBeenCalledWith(servicio)
  })
})