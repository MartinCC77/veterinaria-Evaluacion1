import { describe, it, expect } from 'vitest'
import { filtrarServicios, obtenerCategorias, obtenerOfertas, contarPorCategoria } from './filtros'

const servicios = [
  { id: 1, nombre: 'Consulta general', categoria: 'Consulta', oferta: false },
  { id: 2, nombre: 'Vacunación', categoria: 'Prevención', oferta: true },
  { id: 3, nombre: 'Desparasitación', categoria: 'Prevención', oferta: true },
]

describe('filtrarServicios', () => {
  it('devuelve todos si no hay texto ni categoría', () => {
    expect(filtrarServicios(servicios, '', '')).toHaveLength(3)
  })

  it('filtra por texto sin importar mayúsculas', () => {
    const resultado = filtrarServicios(servicios, 'VACUNA', '')
    expect(resultado).toEqual([servicios[1]])
  })

  it('filtra por categoría', () => {
    expect(filtrarServicios(servicios, '', 'Prevención')).toHaveLength(2)
  })

  it('devuelve lista vacía si nada coincide', () => {
    expect(filtrarServicios(servicios, 'cirugía', '')).toEqual([])
  })
})

describe('obtenerCategorias', () => {
  it('devuelve las categorías sin repetir', () => {
    expect(obtenerCategorias(servicios)).toEqual(['Consulta', 'Prevención'])
  })
})

describe('obtenerOfertas', () => {
  it('devuelve solo los servicios en oferta', () => {
    expect(obtenerOfertas(servicios).map((s) => s.id)).toEqual([2, 3])
  })
})

describe('contarPorCategoria', () => {
  it('cuenta cuántos servicios tiene cada categoría', () => {
    expect(contarPorCategoria(servicios)).toEqual([
      { nombre: 'Consulta', cantidad: 1 },
      { nombre: 'Prevención', cantidad: 2 },
    ])
  })
})