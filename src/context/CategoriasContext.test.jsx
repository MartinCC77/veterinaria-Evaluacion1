import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CategoriasProvider, useCategorias } from './CategoriasContext'

const wrapper = ({ children }) => <CategoriasProvider>{children}</CategoriasProvider>

describe('useCategorias', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('lista las categorías iniciales', () => {
    const { result } = renderHook(() => useCategorias(), { wrapper })
    expect(result.current.categorias).toHaveLength(3)
  })

  it('crea una categoría y actualiza la lista', () => {
    const { result } = renderHook(() => useCategorias(), { wrapper })

    let respuesta
    act(() => {
      respuesta = result.current.crear('Estética')
    })

    expect(respuesta.ok).toBe(true)
    expect(result.current.categorias).toContain('Estética')
  })

  it('devuelve un error si la categoría ya existe', () => {
    const { result } = renderHook(() => useCategorias(), { wrapper })

    let respuesta
    act(() => {
      respuesta = result.current.crear('Consulta')
    })

    expect(respuesta.ok).toBe(false)
    expect(respuesta.error).toContain('Ya existe')
  })

  it('renombra una categoría', () => {
    const { result } = renderHook(() => useCategorias(), { wrapper })

    act(() => {
      result.current.renombrar('Cirugía', 'Cirugías')
    })

    expect(result.current.categorias).toContain('Cirugías')
    expect(result.current.categorias).not.toContain('Cirugía')
  })
})