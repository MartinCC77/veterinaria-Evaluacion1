import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioReagendar from './FormularioReagendar'

const HOY = '2026-10-14' 

describe('FormularioReagendar', () => {
  it('muestra los errores y NO avisa si no se eligió fecha ni hora', async () => {
    const onEnviar = vi.fn()
    render(<FormularioReagendar hoy={HOY} onEnviar={onEnviar} onCancelar={() => {}} />)

    await userEvent.click(screen.getByRole('button', { name: /proponer horario/i }))

    expect(screen.getAllByRole('alert')).toHaveLength(2)
    expect(onEnviar).not.toHaveBeenCalled()
  })

  it('rechaza una fecha anterior a hoy', async () => {
    const onEnviar = vi.fn()
    render(<FormularioReagendar hoy={HOY} onEnviar={onEnviar} onCancelar={() => {}} />)

    await userEvent.type(screen.getByLabelText('Fecha'), '2026-10-01')
    await userEvent.selectOptions(screen.getByLabelText('Hora'), '10:00')
    await userEvent.click(screen.getByRole('button', { name: /proponer horario/i }))

    expect(screen.getByRole('alert')).toHaveTextContent('anterior a hoy')
    expect(onEnviar).not.toHaveBeenCalled()
  })

  it('avisa con la fecha y la hora cuando son válidas', async () => {
    const onEnviar = vi.fn()
    render(<FormularioReagendar hoy={HOY} onEnviar={onEnviar} onCancelar={() => {}} />)

    await userEvent.type(screen.getByLabelText('Fecha'), '2026-10-20')
    await userEvent.selectOptions(screen.getByLabelText('Hora'), '10:00')
    await userEvent.click(screen.getByRole('button', { name: /proponer horario/i }))

    expect(onEnviar).toHaveBeenCalledWith({ fecha: '2026-10-20', hora: '10:00' })
  })

  it('avisa al padre al presionar Cancelar', async () => {
    const onCancelar = vi.fn()
    render(<FormularioReagendar hoy={HOY} onEnviar={() => {}} onCancelar={onCancelar} />)

    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))

    expect(onCancelar).toHaveBeenCalledTimes(1)
  })
})