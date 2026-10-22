import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioSolicitudCita from './FormularioSolicitudCita'

const servicios = [
  { id: 1, nombre: 'Consulta general', categoria: 'Consulta', precio: 18000 },
  { id: 2, nombre: 'Vacunación', categoria: 'Prevención', precio: 15000 },
]
const HOY = '2026-10-14'

async function llenarFormulario() {
  await userEvent.type(screen.getByLabelText(/nombre del dueño/i), 'Juan Pérez')
  await userEvent.type(screen.getByLabelText(/correo/i), 'juan@correo.cl')
  await userEvent.type(screen.getByLabelText(/nombre de la mascota/i), 'Cachulo')
  await userEvent.selectOptions(screen.getByLabelText('Especie'), 'perro')
  await userEvent.type(screen.getByLabelText('Fecha'), '2026-10-20')
  await userEvent.selectOptions(screen.getByLabelText('Hora'), '10:00')
  await userEvent.type(screen.getByLabelText(/motivo/i), 'Control de rutina')
}

describe('FormularioSolicitudCita', () => {
  it('muestra los errores y NO avisa a la página si el formulario está vacío', async () => {
    const onEnviar = vi.fn()
    render(<FormularioSolicitudCita servicios={servicios} onEnviar={onEnviar} hoy={HOY} />)

    await userEvent.click(screen.getByRole('button', { name: /reservar cita/i }))

    // Se muestran TODOS los errores juntos, no solo el primero.
    expect(screen.getAllByRole('alert').length).toBeGreaterThan(3)
    expect(onEnviar).not.toHaveBeenCalled()
  })

  it('avisa a la página con los datos cuando todo es válido', async () => {
    const onEnviar = vi.fn()
    render(<FormularioSolicitudCita servicios={servicios} servicioInicial={2} onEnviar={onEnviar} hoy={HOY} />)

    await llenarFormulario()
    await userEvent.click(screen.getByRole('button', { name: /reservar cita/i }))

    expect(onEnviar).toHaveBeenCalledTimes(1)
    expect(onEnviar).toHaveBeenCalledWith(
      expect.objectContaining({ mascota: 'Cachulo', servicioNombre: 'Vacunación', precioFinal: 15000 }),
    )
  })

  it('suma $10.000 al precio cuando se marca la urgencia en una consulta', async () => {
    render(<FormularioSolicitudCita servicios={servicios} servicioInicial={1} onEnviar={() => {}} hoy={HOY} />)

    expect(screen.getByTestId('precio-final')).toHaveTextContent('$18.000')

    await userEvent.click(screen.getByLabelText(/urgencia fuera de horario/i))

    expect(screen.getByTestId('precio-final')).toHaveTextContent('$28.000')
  })
})