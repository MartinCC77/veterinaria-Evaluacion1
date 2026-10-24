import { describe, it, expect, beforeEach } from 'vitest'
import { listarUsuarios, crearUsuario, actualizarUsuario, autenticar, quitarClave } from './usuarioService'

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

describe('actualizarUsuario', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('cambia solo los campos indicados y no devuelve la clave', () => {
    const actualizado = actualizarUsuario(3, { nombre: 'Juan P. Soto' })
    expect(actualizado.nombre).toBe('Juan P. Soto')
    expect(actualizado.correo).toBe('juan@correo.cl')
    expect(actualizado).not.toHaveProperty('clave')
  })

  it('permite guardar el mismo correo del propio usuario', () => {
    expect(() => actualizarUsuario(3, { correo: 'JUAN@correo.cl' })).not.toThrow()
  })

  it('lanza un error si el correo nuevo ya lo tiene otro usuario', () => {
    expect(() => actualizarUsuario(3, { correo: 'admin@sanmarcos.cl' })).toThrow('Ya existe')
  })

  it('la clave nueva sirve para iniciar sesión', () => {
    actualizarUsuario(3, { clave: 'nueva1234' })
    expect(autenticar('juan@correo.cl', 'nueva1234')).not.toBeNull()
    expect(autenticar('juan@correo.cl', 'dueno123')).toBeNull()
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