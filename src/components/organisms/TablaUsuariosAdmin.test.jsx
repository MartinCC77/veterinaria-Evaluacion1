import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TablaUsuariosAdmin from './TablaUsuariosAdmin'

const usuarios = [
  { id: 1, nombre: 'Administrador San Marcos', correo: 'admin@sanmarcos.cl', rol: 'administrador' },
  { id: 3, nombre: 'Juan Pérez', correo: 'juan@correo.cl', rol: 'dueno' },
]

function dibujar(props = {}) {
  render(
    <TablaUsuariosAdmin
      usuarios={usuarios}
      usuarioActualId={1}
      onEditar={() => {}}
      onHistorial={() => {}}
      onEliminar={() => {}}
      {...props}
    />,
  )
}

describe('TablaUsuariosAdmin', () => {
  it('muestra cada usuario con el nombre legible de su rol', () => {
    dibujar()
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    expect(screen.getByText('Dueño de mascota')).toBeInTheDocument()
  })

  it('no deja eliminar la cuenta con la que se inició sesión', () => {
    dibujar()
    const botones = screen.getAllByRole('button', { name: 'Eliminar' })
    expect(botones[0]).toBeDisabled() // el administrador (usuarioActualId = 1)
    expect(botones[1]).toBeEnabled()
  })

  it('avisa qué usuario se quiere editar y de cuál ver el historial', async () => {
    const onEditar = vi.fn()
    const onHistorial = vi.fn()
    dibujar({ onEditar, onHistorial })

    await userEvent.click(screen.getAllByRole('button', { name: 'Editar' })[1])
    await userEvent.click(screen.getAllByRole('button', { name: 'Historial' })[1])

    expect(onEditar).toHaveBeenCalledWith(usuarios[1])
    expect(onHistorial).toHaveBeenCalledWith(usuarios[1])
  })

  it('pide confirmación antes de eliminar y elimina solo al aceptar', async () => {
    const onEliminar = vi.fn()
    dibujar({ onEliminar })

    await userEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[1])
    expect(screen.getByText(/¿Eliminar a "Juan Pérez"\?/)).toBeInTheDocument()
    expect(onEliminar).not.toHaveBeenCalled()

    await userEvent.click(screen.getByRole('button', { name: 'Sí, eliminar' }))
    expect(onEliminar).toHaveBeenCalledWith(usuarios[1])
  })

  it('no elimina si se cancela', async () => {
    const onEliminar = vi.fn()
    dibujar({ onEliminar })

    await userEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[1])
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))

    expect(onEliminar).not.toHaveBeenCalled()
  })
})