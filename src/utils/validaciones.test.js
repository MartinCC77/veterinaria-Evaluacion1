import { describe, it, expect } from 'vitest'
import {
  validarNombreDueno,
  validarCorreo,
  validarMotivo,
  validarFecha,
  validarSeleccion,
  validarClave,
  validarMensaje,
  validarConfirmacionClave,
  validarNumeroPositivo,
  validarPrecioOferta,
} from './validaciones'


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

describe('validarConfirmacionClave', () => {
  it('rechaza claves que no coinciden', () => {
    expect(validarConfirmacionClave('secreta1', 'secreta2')).toBe('Las claves no coinciden.')
  })

  it('acepta claves iguales', () => {
    expect(validarConfirmacionClave('secreta1', 'secreta1')).toBe('')
  })
})

describe('validarNumeroPositivo', () => {
  it('rechaza el texto vacío', () => {
    expect(validarNumeroPositivo('', 'El precio')).toBe('El precio es obligatorio.')
  })

  it('rechaza texto que no es un número', () => {
    expect(validarNumeroPositivo('abc', 'El precio')).toContain('mayor que 0')
  })

  it('rechaza el cero y los negativos', () => {
    expect(validarNumeroPositivo('0', 'El precio')).not.toBe('')
    expect(validarNumeroPositivo('-5', 'El precio')).not.toBe('')
  })

  it('acepta un número positivo', () => {
    expect(validarNumeroPositivo('15000', 'El precio')).toBe('')
  })
})

describe('validarPrecioOferta', () => {
  it('rechaza una oferta igual o mayor que el precio normal', () => {
    expect(validarPrecioOferta('15000', '15000')).toContain('menor')
    expect(validarPrecioOferta('20000', '15000')).toContain('menor')
  })

  it('acepta una oferta menor que el precio normal', () => {
    expect(validarPrecioOferta('12000', '15000')).toBe('')
  })
})