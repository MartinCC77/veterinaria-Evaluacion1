import { describe, it, expect } from 'vitest'
import {
  validarNombreDueno,
  validarCorreo,
  validarMotivo,
  validarFecha,
  validarSeleccion,
  validarClave,
} from './validaciones'

// Recordatorio: cada regla devuelve un mensaje si el valor es inválido, o '' si está bien.

describe('validarNombreDueno', () => {
  it('rechaza nombres con menos de 3 caracteres', () => {
    expect(validarNombreDueno('Ab')).toContain('mínimo 3')
  })

  it('rechaza un nombre hecho solo de espacios', () => {
    expect(validarNombreDueno('     ')).not.toBe('')
  })

  it('acepta un nombre válido', () => {
    expect(validarNombreDueno('Juan Pérez')).toBe('')
  })
})

describe('validarCorreo', () => {
  it('rechaza un correo sin arroba', () => {
    expect(validarCorreo('juan.correo.cl')).toContain('correo válido')
  })

  it('rechaza un correo sin punto después de la arroba', () => {
    expect(validarCorreo('juan@correo')).not.toBe('')
  })

  it('acepta un correo válido', () => {
    expect(validarCorreo('juan@correo.cl')).toBe('')
  })
})

describe('validarMotivo', () => {
  it('rechaza motivos con menos de 5 caracteres', () => {
    expect(validarMotivo('tos')).not.toBe('')
  })

  it('acepta un motivo descriptivo', () => {
    expect(validarMotivo('Vómitos desde ayer')).toBe('')
  })
})

describe('validarFecha', () => {
  it('rechaza una fecha vacía', () => {
    expect(validarFecha('', '2026-10-14')).toBe('Selecciona una fecha.')
  })

  it('rechaza una fecha anterior a hoy', () => {
    expect(validarFecha('2026-10-01', '2026-10-14')).toContain('anterior a hoy')
  })

  it('acepta la fecha de hoy', () => {
    expect(validarFecha('2026-10-14', '2026-10-14')).toBe('')
  })
})

describe('validarSeleccion', () => {
  it('rechaza el valor vacío (no eligió nada)', () => {
    expect(validarSeleccion('', 'la especie')).toBe('Selecciona la especie.')
  })
})

describe('validarClave', () => {
  it('rechaza claves de menos de 6 caracteres', () => {
    expect(validarClave('12345')).not.toBe('')
  })
})