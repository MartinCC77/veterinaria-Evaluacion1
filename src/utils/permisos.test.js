import { describe, it, expect } from 'vitest'
import { esPersonal, esAdministrador, etiquetaRol } from './permisos'

describe('esPersonal', () => {
  it('es verdadero para el administrador y la recepcionista', () => {
    expect(esPersonal({ rol: 'administrador' })).toBe(true)
    expect(esPersonal({ rol: 'recepcionista' })).toBe(true)
  })

  it('es falso para un dueño de mascota', () => {
    expect(esPersonal({ rol: 'dueno' })).toBe(false)
  })

  it('es falso si nadie inició sesión (null)', () => {
    expect(esPersonal(null)).toBe(false)
  })
})

describe('esAdministrador', () => {
  it('es verdadero solo para el administrador', () => {
    expect(esAdministrador({ rol: 'administrador' })).toBe(true)
    expect(esAdministrador({ rol: 'recepcionista' })).toBe(false)
  })
})

describe('etiquetaRol', () => {
  it('devuelve el nombre legible de cada rol', () => {
    expect(etiquetaRol('administrador')).toBe('Administrador')
    expect(etiquetaRol('dueno')).toBe('Dueño de mascota')
  })

  it('devuelve el mismo texto si el rol no se conoce', () => {
    expect(etiquetaRol('otro')).toBe('otro')
  })
})