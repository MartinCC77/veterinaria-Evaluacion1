import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EtiquetaEstadoCita from './EtiquetaEstadoCita'

describe('EtiquetaEstadoCita', () => {
  it('muestra el texto del estado confirmada', () => {
    render(<EtiquetaEstadoCita estado="confirmada" />)
    expect(screen.getByText('Confirmada')).toBeInTheDocument()
  })

  it('muestra "Pendiente" si el estado es desconocido', () => {
    render(<EtiquetaEstadoCita estado="inventado" />)
    expect(screen.getByText('Pendiente')).toBeInTheDocument()
  })
})