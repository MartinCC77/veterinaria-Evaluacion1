import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Boton from './Boton'

describe('Boton', () => {
  it('muestra el texto que recibe', () => {
    render(<Boton>Reservar cita</Boton>)
    expect(screen.getByRole('button', { name: 'Reservar cita' })).toBeInTheDocument()
  })

  it('llama a onClick al hacer clic', async () => {
    const onClick = vi.fn() 
    render(<Boton onClick={onClick}>Enviar</Boton>)

    await userEvent.click(screen.getByRole('button', { name: 'Enviar' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('queda deshabilitado cuando se le indica', () => {
    render(<Boton deshabilitado>Enviar</Boton>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})