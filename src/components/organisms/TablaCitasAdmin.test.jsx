import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TablaCitasAdmin from './TablaCitasAdmin'

const HOY = '2026-10-14'
const pendiente = { id: 1, fecha: '2026-10-20', hora: '10:00', dueno: 'Juan', mascota: 'Cachulo', servicioNombre: 'Vacunación', estado: 'pendiente' }
const confirmada = { ...pendiente, id: 2, mascota: 'Michi', estado: 'confirmada' }
const cancelada = { ...pendiente, id: 3, mascota: 'Rex', estado: 'cancelada' }

// Props por defecto: cada prueba reemplaza solo la función que le interesa.
function dibujar(citas, props = {}) {
  render(
    <TablaCitasAdmin
      citas={citas}
      hoy={HOY}
      onConfirmar={() => {}}
      onReagendar={() => {}}
      onCancelar={() => {}}
      onVerComprobante={() => {}}
      {...props}
    />,
  )
}

describe('TablaCitasAdmin', () => {
  it('muestra un aviso si no hay solicitudes', () => {
    dibujar([])
    expect(screen.getByText('No hay solicitudes para mostrar.')).toBeInTheDocument()
  })

  it('una cita pendiente se puede confirmar', async () => {
    const onConfirmar = vi.fn()
    dibujar([pendiente], { onConfirmar })

    await userEvent.click(screen.getByRole('button', { name: 'Confirmar' }))

    expect(onConfirmar).toHaveBeenCalledWith(pendiente)
  })

  it('una cita confirmada ya no ofrece Confirmar ni Otro horario', () => {
    dibujar([confirmada])
    expect(screen.queryByRole('button', { name: 'Confirmar' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Otro horario' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancelar cita' })).toBeInTheDocument()
  })

  it('una cita cancelada solo ofrece el comprobante', () => {
    dibujar([cancelada])
    expect(screen.queryByRole('button', { name: 'Cancelar cita' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Comprobante' })).toBeInTheDocument()
  })

  it('pide confirmación antes de cancelar y cancela solo al aceptar', async () => {
    const onCancelar = vi.fn()
    dibujar([pendiente], { onCancelar })

    await userEvent.click(screen.getByRole('button', { name: 'Cancelar cita' }))
    expect(screen.getByText(/¿Cancelar la cita de Cachulo\?/)).toBeInTheDocument()
    expect(onCancelar).not.toHaveBeenCalled()

    await userEvent.click(screen.getByRole('button', { name: 'Sí, cancelar' }))
    expect(onCancelar).toHaveBeenCalledWith(pendiente)
  })

  it('propone otro horario con el formulario y avisa con la fecha y la hora', async () => {
    const onReagendar = vi.fn()
    dibujar([pendiente], { onReagendar })

    await userEvent.click(screen.getByRole('button', { name: 'Otro horario' }))
    await userEvent.type(screen.getByLabelText('Fecha'), '2026-10-25')
    await userEvent.selectOptions(screen.getByLabelText('Hora'), '11:00')
    await userEvent.click(screen.getByRole('button', { name: /proponer horario/i }))

    expect(onReagendar).toHaveBeenCalledWith(pendiente, { fecha: '2026-10-25', hora: '11:00' })
  })

  it('avisa qué comprobante se quiere ver', async () => {
    const onVerComprobante = vi.fn()
    dibujar([pendiente], { onVerComprobante })

    await userEvent.click(screen.getByRole('button', { name: 'Comprobante' }))

    expect(onVerComprobante).toHaveBeenCalledWith(pendiente)
  })
})