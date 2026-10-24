import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { AuthProvider, useAuth } from './AuthContext'

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('parte sin usuario con sesión', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    expect(result.current.usuario).toBeNull()
  })

  it('inicia sesión con credenciales correctas', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    let respuesta
    act(() => {
      respuesta = result.current.iniciarSesion('juan@correo.cl', 'dueno123')
    })

    expect(respuesta.ok).toBe(true)
    expect(result.current.usuario.nombre).toBe('Juan Pérez')
  })

  it('rechaza credenciales incorrectas y deja la sesión sin iniciar', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    let respuesta
    act(() => {
      respuesta = result.current.iniciarSesion('juan@correo.cl', 'mala')
    })

    expect(respuesta.ok).toBe(false)
    expect(respuesta.error).toContain('incorrectos')
    expect(result.current.usuario).toBeNull()
  })

  it('cierra la sesión', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    act(() => {
      result.current.iniciarSesion('juan@correo.cl', 'dueno123')
    })
    act(() => {
      result.current.cerrarSesion()
    })

    expect(result.current.usuario).toBeNull()
  })

  it('registra una cuenta nueva y deja la sesión iniciada', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    act(() => {
      result.current.registrar({ nombre: 'Ana Soto', correo: 'ana@correo.cl', clave: 'secreta1' })
    })

    expect(result.current.usuario.correo).toBe('ana@correo.cl')
  })
})