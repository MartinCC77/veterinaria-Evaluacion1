import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EtiquetaOferta from './EtiquetaOferta'

describe('EtiquetaOferta', () => {
  it('muestra el porcentaje de descuento', () => {
    render(<EtiquetaOferta porcentaje={25} />)
    expect(screen.getByText('-25%')).toBeInTheDocument()
  })
})