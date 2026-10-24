import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioUsuario from './FormularioUsuario'

const usuario = { id: 3, nombre: 'Juan Pérez', correo: 'juan@correo.cl', rol: 'dueno' }

describe('FormularioUsuario', () => {
  it('al crear, muestra los errores y NO avisa si está vacío', async () => {
    const onEnviar = vi.fn()
    render(<FormularioUsuario onEnviar={onEnviar} />)

    await userEvent.click(screen.getByRole('button', { name: /crear usuario/i }))

    expect(screen.getAllByRole('alert')).toHaveLength(4)
    expect(onEnviar).not.toHaveBeenCalled()
  })

  it('al crear, entrega los datos con la clave cuando todo es válido', async () => {
    const onEnviar = vi.fn()
    render(<FormularioUsuario onEnviar={onEnviar} />)

    await userEvent.type(screen.getByLabelText(/nombre completo/i), 'Ana Soto')
    await userEvent.type(screen.getByLabelText(/correo/i), 'ana@correo.cl')
    await userEvent.type(screen.getByLabelText('Clave'), 'secreta1')
    await userEvent.selectOptions(screen.getByLabelText('Rol'), 'recepcionista')
    await userEvent.click(screen.getByRole('button', { name: /crear usuario/i }))

    expect(onEnviar).toHaveBeenCalledWith({
      nombre: 'Ana Soto',
      correo: 'ana@correo.cl',
      rol: 'recepcionista',
      clave: 'secreta1',
    })
  })

  it('al editar, parte con los datos del usuario y la clave es opcional', async () => {
    const onEnviar = vi.fn()
    render(<FormularioUsuario usuario={usuario} onEnviar={onEnviar} />)

    expect(screen.getByLabelText(/nombre completo/i)).toHaveValue('Juan Pérez')
    expect(screen.getByLabelText('Rol')).toHaveValue('dueno')

    await userEvent.click(screen.getByRole('button', { name: /guardar cambios/i }))

    expect(onEnviar).toHaveBeenCalledWith({ nombre: 'Juan Pérez', correo: 'juan@correo.cl', rol: 'dueno' })
  })

  it('al editar, rechaza una clave nueva demasiado corta', async () => {
    const onEnviar = vi.fn()
    render(<FormularioUsuario usuario={usuario} onEnviar={onEnviar} />)

    await userEvent.type(screen.getByLabelText(/nueva clave/i), '123')
    await userEvent.click(screen.getByRole('button', { name: /guardar cambios/i }))

    expect(screen.getByRole('alert')).toHaveTextContent('al menos 6 caracteres')
    expect(onEnviar).not.toHaveBeenCalled()
  })

  it('muestra el error general que entrega la página', () => {
    render(<FormularioUsuario onEnviar={() => {}} errorGeneral="Ya existe una cuenta con ese correo" />)
    expect(screen.getByText('Ya existe una cuenta con ese correo')).toBeInTheDocument()
  })
})