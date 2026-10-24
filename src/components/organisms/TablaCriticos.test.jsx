import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TablaCriticos from './TablaCriticos'

const filas = [
  { servicio: { id: 1, nombre: 'Vacunación', categoria: 'Prevención' }, pendientes: 3, critico: true },
  { servicio: { id: 2, nombre: 'Consulta general', categoria: 'Consulta' }, pendientes: 0, critico: false },
]

describe('TablaCriticos', () => {
  it('marca como crítico el servicio que lo es y como normal el otro', () => {
    render(<TablaCriticos filas={filas} />)

    expect(screen.getByText('Crítico')).toBeInTheDocument()
    expect(screen.getByText('Normal')).toBeInTheDocument()
  })

  it('muestra la cantidad de solicitudes pendientes', () => {
    render(<TablaCriticos filas={filas} />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('muestra un aviso si no hay servicios', () => {
    render(<TablaCriticos filas={[]} />)
    expect(screen.getByText('No hay servicios para mostrar.')).toBeInTheDocument()
  })
})