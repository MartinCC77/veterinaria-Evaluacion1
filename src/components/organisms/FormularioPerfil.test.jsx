import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioPerfil from './FormularioPerfil'

const usuario = { id: 1, nombre: 'Administrador San Marcos', correo: 'admin@sanmarcos.cl', rol: 'administrador' }

describe('FormularioPerfil', () => {
  it('parte con el nombre actual y muestra el correo y el rol', () => {
    render(<FormularioPerfil usuario={usuario} onEnviar={() => {}} />)

    expect(screen.getByLabelText('Nombre')).toHaveValue('Administrador San Marcos')
    expect(screen.getByText('admin@sanmarcos.cl')).toBeInTheDocument()
    expect(screen.getByText('Administrador')).toBeInTheDocument()
  })

  it('entrega solo el nombre si la clave nueva se deja vacía', async () => {
    const onEnviar = vi.fn()
    render(<FormularioPerfil usuario={usuario} onEnviar={onEnviar} />)

    await userEvent.click(screen.getByRole('button', { name: /guardar cambios/i }))

    expect(onEnviar).toHaveBeenCalledWith({ nombre: 'Administrador San Marcos' })
  })

  it('entrega también la clave cuando se escribe una válida', async () => {
    const onEnviar = vi.fn()
    render(<FormularioPerfil usuario={usuario} onEnviar={onEnviar} />)

    await userEvent.type(screen.getByLabelText(/nueva clave/i), 'nueva123')
    await userEvent.click(screen.getByRole('button', { name: /guardar cambios/i }))

    expect(onEnviar).toHaveBeenCalledWith({ nombre: 'Administrador San Marcos', clave: 'nueva123' })
  })

  it('rechaza una clave nueva demasiado corta', async () => {
    const onEnviar = vi.fn()
    render(<FormularioPerfil usuario={usuario} onEnviar={onEnviar} />)

    await userEvent.type(screen.getByLabelText(/nueva clave/i), '123')
    await userEvent.click(screen.getByRole('button', { name: /guardar cambios/i }))

    expect(screen.getByRole('alert')).toHaveTextContent('al menos 6 caracteres')
    expect(onEnviar).not.toHaveBeenCalled()
  })
})