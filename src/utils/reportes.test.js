import { describe, it, expect } from 'vitest'
import { contarCitasPorEstado } from './reportes'

describe('contarCitasPorEstado', () => {
  it('cuenta las citas de cada estado', () => {
    const citas = [{ estado: 'pendiente' }, { estado: 'pendiente' }, { estado: 'confirmada' }]
    expect(contarCitasPorEstado(citas)).toEqual({ pendiente: 2, confirmada: 1, reagendada: 0, cancelada: 0 })
  })

  it('devuelve todo en cero si no hay citas', () => {
    expect(contarCitasPorEstado([])).toEqual({ pendiente: 0, confirmada: 0, reagendada: 0, cancelada: 0 })
  })

  it('ignora estados desconocidos', () => {
    expect(contarCitasPorEstado([{ estado: 'inventado' }]).pendiente).toBe(0)
  })
})