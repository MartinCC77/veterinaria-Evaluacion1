import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CampoFormulario from './CampoFormulario'

describe('CampoFormulario', () => {
  it('muestra la etiqueta y NO muestra error si el error está vacío', () => {
    render(<CampoFormulario id="dueno" etiqueta="Nombre" valor="" onCambio={() => {}} error="" />)

    expect(screen.getByLabelText('Nombre')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('muestra el mensaje de error junto al campo', () => {
    render(<CampoFormulario id="dueno" etiqueta="Nombre" valor="" onCambio={() => {}} error="Campo obligatorio" />)

    expect(screen.getByRole('alert')).toHaveTextContent('Campo obligatorio')
  })

  it('avisa el texto nuevo cada vez que la persona escribe', async () => {
    const onCambio = vi.fn()
    render(<CampoFormulario id="dueno" etiqueta="Nombre" valor="" onCambio={onCambio} />)

    await userEvent.type(screen.getByLabelText('Nombre'), 'A')

    expect(onCambio).toHaveBeenCalledWith('A')
  })
})