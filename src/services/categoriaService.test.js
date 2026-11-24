import { describe, it, expect, beforeEach } from 'vitest'
import { listarCategorias, crearCategoria, renombrarCategoria } from './categoriaService'

describe('categoriaService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('parte con las 3 categorías iniciales', () => {
    expect(listarCategorias()).toEqual(['Consulta', 'Prevención', 'Cirugía'])
  })

  it('crea una categoría nueva', () => {
    crearCategoria('Estética')
    expect(listarCategorias()).toContain('Estética')
  })

  it('rechaza una categoría repetida, sin importar mayúsculas', () => {
    expect(() => crearCategoria('  consulta ')).toThrow('Ya existe')
  })

  it('renombra una categoría y conserva su posición', () => {
    renombrarCategoria('Cirugía', 'Cirugías')
    expect(listarCategorias()).toEqual(['Consulta', 'Prevención', 'Cirugías'])
  })

  it('rechaza renombrar a un nombre que ya tiene otra categoría', () => {
    expect(() => renombrarCategoria('Cirugía', 'Consulta')).toThrow('Ya existe')
  })

  it('permite cambiar solo las mayúsculas del mismo nombre', () => {
    expect(() => renombrarCategoria('Consulta', 'CONSULTA')).not.toThrow()
  })
})