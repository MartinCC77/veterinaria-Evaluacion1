import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioLogin from './FormularioLogin'

describe('FormularioLogin', () => {
  it('muestra los errores y NO avisa a la página si está vacío', async () => {
    const onEnviar = vi.fn()
    render(<FormularioLogin onEnviar={onEnviar} />)

    await userEvent.click(screen.getByRole('button', { name: /ingresar/i }))

    expect(screen.getAllByRole('alert')).toHaveLength(2)
    expect(onEnviar).not.toHaveBeenCalled()
  })

  it('avisa a la página con el correo y la clave cuando son válidos', async () => {
    const onEnviar = vi.fn()
    render(<FormularioLogin onEnviar={onEnviar} />)

    await userEvent.type(screen.getByLabelText(/correo/i), 'juan@correo.cl')
    await userEvent.type(screen.getByLabelText('Clave'), 'dueno123')
    await userEvent.click(screen.getByRole('button', { name: /ingresar/i }))

    expect(onEnviar).toHaveBeenCalledWith({ correo: 'juan@correo.cl', clave: 'dueno123' })
  })

  it('muestra el error general que entrega la página', () => {
    render(<FormularioLogin onEnviar={() => {}} errorGeneral="Correo o clave incorrectos." />)
    expect(screen.getByRole('alert')).toHaveTextContent('Correo o clave incorrectos.')
  })
})