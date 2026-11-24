import { describe, it, expect, beforeEach } from 'vitest'
import { guardarSesion, obtenerSesion, cerrarSesion } from './sesionService'

describe('sesionService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('devuelve null si nadie inició sesión', () => {
    expect(obtenerSesion()).toBeNull()
  })

  it('recuerda el id del usuario que inició sesión', () => {
    guardarSesion(3)
    expect(obtenerSesion()).toBe(3)
  })

  it('olvida la sesión al cerrarla', () => {
    guardarSesion(3)
    cerrarSesion()
    expect(obtenerSesion()).toBeNull()
  })
})