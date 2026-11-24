import { describe, it, expect } from 'vitest'
import {
  formatearPrecio,
  calcularPrecioCita,
  obtenerPrecioVigente,
  calcularPorcentajeDescuento,
  RECARGO_URGENCIA,
} from './precios'

describe('formatearPrecio', () => {
  it('agrega el símbolo $ y el separador de miles', () => {
    expect(formatearPrecio(18000)).toBe('$18.000')
  })

  it('formatea el cero', () => {
    expect(formatearPrecio(0)).toBe('$0')
  })
})

describe('calcularPrecioCita', () => {
  it('devuelve el precio base cuando no es urgencia', () => {
    expect(calcularPrecioCita(18000, false)).toBe(18000)
  })

  it('suma $10.000 si es urgencia fuera de horario', () => {
    expect(calcularPrecioCita(18000, true)).toBe(28000)
    expect(RECARGO_URGENCIA).toBe(10000)
  })

  it('lanza un error si el precio base es negativo', () => {
    expect(() => calcularPrecioCita(-1, false)).toThrow('negativo')
  })
})

describe('obtenerPrecioVigente', () => {
  it('devuelve el precio normal si el servicio no está en oferta', () => {
    expect(obtenerPrecioVigente({ precio: 15000, oferta: false, precioOferta: null })).toBe(15000)
  })

  it('devuelve el precio de oferta si el servicio está en oferta', () => {
    expect(obtenerPrecioVigente({ precio: 15000, oferta: true, precioOferta: 12000 })).toBe(12000)
  })
})

describe('calcularPorcentajeDescuento', () => {
  it('calcula el porcentaje de ahorro de una oferta', () => {
    expect(calcularPorcentajeDescuento({ precio: 15000, oferta: true, precioOferta: 12000 })).toBe(20)
  })

  it('devuelve 0 si no hay oferta', () => {
    expect(calcularPorcentajeDescuento({ precio: 15000, oferta: false, precioOferta: null })).toBe(0)
  })
})