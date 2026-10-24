import { describe, it, expect, beforeEach } from 'vitest'
import { listarUsuarios, crearUsuario, autenticar, quitarClave } from './usuarioService'

describe('usuarioService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('parte con los 3 usuarios iniciales', () => {
    expect(listarUsuarios()).toHaveLength(3)
  })

  it('autentica con el correo y la clave correctos, sin devolver la clave', () => {
    const usuario = autenticar('admin@sanmarcos.cl', 'admin123')
    expect(usuario.rol).toBe('administrador')
    expect(usuario).not.toHaveProperty('clave')
  })

  it('no autentica con una clave incorrecta', () => {
    expect(autenticar('admin@sanmarcos.cl', 'otra')).toBeNull()
  })

  it('ignora mayúsculas y espacios en el correo al autenticar', () => {
    expect(autenticar('  JUAN@correo.cl ', 'dueno123')).not.toBeNull()
  })

  it('crea un usuario nuevo con rol dueño y sin devolver la clave', () => {
    const nuevo = crearUsuario({ nombre: 'Ana Soto', correo: 'ana@correo.cl', clave: 'secreta1' })
    expect(nuevo.id).toBe(4)
    expect(nuevo.rol).toBe('dueno')
    expect(nuevo).not.toHaveProperty('clave')
  })

  it('lanza un error si el correo ya está registrado', () => {
    expect(() => crearUsuario({ nombre: 'Otro Juan', correo: 'JUAN@correo.cl', clave: 'secreta1' })).toThrow('Ya existe')
  })
})

describe('quitarClave', () => {
  it('devuelve una copia sin la clave y no modifica el original', () => {
    const original = { id: 1, nombre: 'Ana', clave: 'x' }
    const publico = quitarClave(original)
    expect(publico).toEqual({ id: 1, nombre: 'Ana' })
    expect(original.clave).toBe('x')
  })
})