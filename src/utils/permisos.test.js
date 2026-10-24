import { describe, it, expect } from 'vitest'
import { esPersonal, esAdministrador } from './permisos'

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