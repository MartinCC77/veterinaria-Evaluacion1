import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TarjetaResumen from './TarjetaResumen'

describe('TarjetaResumen', () => {
  it('muestra el título, el valor y el detalle', () => {
    render(<TarjetaResumen titulo="Pendientes" valor={4} detalle="10 en total" />)

    expect(screen.getByText('Pendientes')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('10 en total')).toBeInTheDocument()
  })

  it('no muestra botón si no recibe onVer', () => {
    render(<TarjetaResumen titulo="Pendientes" valor={4} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('llama a onVer al hacer clic en el botón', async () => {
    const onVer = vi.fn()
    render(<TarjetaResumen titulo="Pendientes" valor={4} onVer={onVer} textoBoton="Gestionar" />)

    await userEvent.click(screen.getByRole('button', { name: 'Gestionar' }))

    expect(onVer).toHaveBeenCalledTimes(1)
  })
})