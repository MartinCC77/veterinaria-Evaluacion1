import { describe, it, expect } from 'vitest'
import { filtrarServicios, obtenerCategorias, obtenerOfertas, contarPorCategoria, filtrarCitasDeUsuario, filtrarCitasPorEstado } from './filtros'

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

export function filtrarCitasDeUsuario(citas, usuario) {
  if (usuario.rol === 'dueno') {
    return citas.filter((c) => c.usuarioId === usuario.id)
  }
  return citas
}

describe('filtrarCitasDeUsuario', () => {
  const citas = [
    { id: 1, usuarioId: 3 },
    { id: 2, usuarioId: 4 },
    { id: 3, usuarioId: null },
  ]

  it('un dueño de mascota ve solo sus citas', () => {
    expect(filtrarCitasDeUsuario(citas, { id: 3, rol: 'dueno' })).toEqual([citas[0]])
  })

  it('el personal de la clínica ve todas las citas', () => {
    expect(filtrarCitasDeUsuario(citas, { id: 1, rol: 'administrador' })).toHaveLength(3)
  })
})

describe('filtrarCitasPorEstado', () => {
  const citas = [{ id: 1, estado: 'pendiente' }, { id: 2, estado: 'confirmada' }, { id: 3, estado: 'pendiente' }]

  it('devuelve todas las citas si no hay estado elegido', () => {
    expect(filtrarCitasPorEstado(citas, '')).toHaveLength(3)
  })

  it('devuelve solo las citas con ese estado', () => {
    expect(filtrarCitasPorEstado(citas, 'pendiente').map((c) => c.id)).toEqual([1, 3])
  })

  it('devuelve una lista vacía si ninguna coincide', () => {
    expect(filtrarCitasPorEstado(citas, 'cancelada')).toEqual([])
  })
})