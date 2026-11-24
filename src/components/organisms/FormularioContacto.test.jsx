import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioContacto from './FormularioContacto'

describe('FormularioContacto', () => {
  it('muestra los errores y NO avisa a la página si el formulario está vacío', async () => {
    const onEnviar = vi.fn()
    render(<FormularioContacto onEnviar={onEnviar} />)

    await userEvent.click(screen.getByRole('button', { name: /enviar mensaje/i }))

    expect(screen.getAllByRole('alert')).toHaveLength(3)
    expect(onEnviar).not.toHaveBeenCalled()
  })

  it('avisa a la página con los datos cuando todo es válido', async () => {
    const onEnviar = vi.fn()
    render(<FormularioContacto onEnviar={onEnviar} />)

    await userEvent.type(screen.getByLabelText('Nombre'), 'Juan Pérez')
    await userEvent.type(screen.getByLabelText(/correo/i), 'juan@correo.cl')
    await userEvent.type(screen.getByLabelText('Mensaje'), 'Quisiera consultar por vacunas')
    await userEvent.click(screen.getByRole('button', { name: /enviar mensaje/i }))

    expect(onEnviar).toHaveBeenCalledWith({
      nombre: 'Juan Pérez',
      correo: 'juan@correo.cl',
      mensaje: 'Quisiera consultar por vacunas',
    })
  })

  it('deja el formulario limpio después de enviar', async () => {
    render(<FormularioContacto onEnviar={() => {}} />)

    await userEvent.type(screen.getByLabelText('Nombre'), 'Juan Pérez')
    await userEvent.type(screen.getByLabelText(/correo/i), 'juan@correo.cl')
    await userEvent.type(screen.getByLabelText('Mensaje'), 'Quisiera consultar por vacunas')
    await userEvent.click(screen.getByRole('button', { name: /enviar mensaje/i }))

    expect(screen.getByLabelText('Nombre')).toHaveValue('')
  })
})