import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioRegistro from './FormularioRegistro'

async function llenar(clave, confirmacion) {
  await userEvent.type(screen.getByLabelText(/nombre completo/i), 'Ana Soto')
  await userEvent.type(screen.getByLabelText(/correo/i), 'ana@correo.cl')
  await userEvent.type(screen.getByLabelText('Clave'), clave)
  await userEvent.type(screen.getByLabelText(/repite la clave/i), confirmacion)
  await userEvent.click(screen.getByRole('button', { name: /crear cuenta/i }))
}

describe('FormularioRegistro', () => {
  it('muestra los errores y NO avisa a la página si está vacío', async () => {
    const onEnviar = vi.fn()
    render(<FormularioRegistro onEnviar={onEnviar} />)

    await userEvent.click(screen.getByRole('button', { name: /crear cuenta/i }))

    expect(screen.getAllByRole('alert')).toHaveLength(3)
    expect(onEnviar).not.toHaveBeenCalled()
  })

  it('rechaza el envío si las claves no coinciden', async () => {
    const onEnviar = vi.fn()
    render(<FormularioRegistro onEnviar={onEnviar} />)

    await llenar('secreta1', 'secreta2')

    expect(screen.getByRole('alert')).toHaveTextContent('Las claves no coinciden.')
    expect(onEnviar).not.toHaveBeenCalled()
  })

  it('avisa a la página con los datos cuando todo es válido', async () => {
    const onEnviar = vi.fn()
    render(<FormularioRegistro onEnviar={onEnviar} />)

    await llenar('secreta1', 'secreta1')

    expect(onEnviar).toHaveBeenCalledWith({ nombre: 'Ana Soto', correo: 'ana@correo.cl', clave: 'secreta1' })
  })
})