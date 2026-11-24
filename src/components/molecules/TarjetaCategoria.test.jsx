import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TarjetaCategoria from './TarjetaCategoria'

describe('TarjetaCategoria', () => {
  it('usa el plural cuando hay más de un servicio', () => {
    render(<TarjetaCategoria nombre="Prevención" cantidad={2} onVer={() => {}} />)
    expect(screen.getByText('2 servicios')).toBeInTheDocument()
  })

  it('usa el singular cuando hay un solo servicio', () => {
    render(<TarjetaCategoria nombre="Cirugía" cantidad={1} onVer={() => {}} />)
    expect(screen.getByText('1 servicio')).toBeInTheDocument()
  })

  it('avisa el nombre de la categoría al hacer clic', async () => {
    const onVer = vi.fn()
    render(<TarjetaCategoria nombre="Prevención" cantidad={2} onVer={onVer} />)

    await userEvent.click(screen.getByRole('button', { name: /ver servicios/i }))

    expect(onVer).toHaveBeenCalledWith('Prevención')
  })
})