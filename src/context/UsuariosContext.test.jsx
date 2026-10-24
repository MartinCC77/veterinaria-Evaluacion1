import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { UsuariosProvider, useUsuarios } from './UsuariosContext'

const wrapper = ({ children }) => <UsuariosProvider>{children}</UsuariosProvider>

describe('useUsuarios', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('lista los usuarios iniciales sin sus claves', () => {
    const { result } = renderHook(() => useUsuarios(), { wrapper })
    expect(result.current.usuarios).toHaveLength(3)
    expect(result.current.usuarios[0]).not.toHaveProperty('clave')
  })

  it('crea un usuario y actualiza la lista', () => {
    const { result } = renderHook(() => useUsuarios(), { wrapper })

    let respuesta
    act(() => {
      respuesta = result.current.crear({ nombre: 'Ana Soto', correo: 'ana@correo.cl', clave: 'secreta1' })
    })

    expect(respuesta.ok).toBe(true)
    expect(result.current.usuarios).toHaveLength(4)
  })

  it('devuelve un error si el correo ya existe', () => {
    const { result } = renderHook(() => useUsuarios(), { wrapper })

    let respuesta
    act(() => {
      respuesta = result.current.crear({ nombre: 'Otro Juan', correo: 'juan@correo.cl', clave: 'secreta1' })
    })

    expect(respuesta.ok).toBe(false)
    expect(result.current.usuarios).toHaveLength(3)
  })

  it('elimina un usuario', () => {
    const { result } = renderHook(() => useUsuarios(), { wrapper })

    act(() => {
      result.current.eliminar(3)
    })

    expect(result.current.usuarios).toHaveLength(2)
  })
})