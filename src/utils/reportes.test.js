import { describe, it, expect } from 'vitest'
import {
  contarCitasPorEstado,
  contarPendientesPorServicio,
  resumirCitasPorServicio,
  calcularIngresos,
  UMBRAL_CRITICO,
} from './reportes'

describe('contarCitasPorEstado', () => {
  it('cuenta las citas de cada estado', () => {
    const citas = [{ estado: 'pendiente' }, { estado: 'pendiente' }, { estado: 'confirmada' }]
    expect(contarCitasPorEstado(citas)).toEqual({ pendiente: 2, confirmada: 1, reagendada: 0, cancelada: 0 })
  })

  it('devuelve todo en cero si no hay citas', () => {
    expect(contarCitasPorEstado([])).toEqual({ pendiente: 0, confirmada: 0, reagendada: 0, cancelada: 0 })
  })

  it('ignora estados desconocidos', () => {
    expect(contarCitasPorEstado([{ estado: 'inventado' }]).pendiente).toBe(0)
  })
})

describe('contarPendientesPorServicio', () => {
  const servicios = [
    { id: 1, nombre: 'Consulta' },
    { id: 2, nombre: 'Vacunación' },
  ]

  it('cuenta solo las citas pendientes de cada servicio', () => {
    const citas = [
      { servicioId: 2, estado: 'pendiente' },
      { servicioId: 2, estado: 'confirmada' },
      { servicioId: 1, estado: 'pendiente' },
    ]
    const filas = contarPendientesPorServicio(servicios, citas)
    expect(filas.find((f) => f.servicio.id === 2).pendientes).toBe(1)
  })

  it('marca como crítico el servicio que llega al umbral', () => {
    const citas = Array.from({ length: UMBRAL_CRITICO }, () => ({ servicioId: 1, estado: 'pendiente' }))
    const filas = contarPendientesPorServicio(servicios, citas)
    expect(filas[0].servicio.id).toBe(1)
    expect(filas[0].critico).toBe(true)
    expect(filas[1].critico).toBe(false)
  })

  it('ordena con los más pendientes primero', () => {
    const citas = [{ servicioId: 2, estado: 'pendiente' }]
    expect(contarPendientesPorServicio(servicios, citas)[0].servicio.id).toBe(2)
  })
})

describe('resumirCitasPorServicio', () => {
  const citas = [
    { servicioNombre: 'Vacunación', estado: 'confirmada', precioFinal: 12000 },
    { servicioNombre: 'Vacunación', estado: 'pendiente', precioFinal: 12000 },
    { servicioNombre: 'Consulta general', estado: 'confirmada', precioFinal: 28000 },
  ]

  it('agrupa por servicio y cuenta las solicitudes', () => {
    const filas = resumirCitasPorServicio(citas)
    expect(filas[0]).toEqual({ servicioNombre: 'Vacunación', cantidad: 2, ingresos: 12000 })
  })

  it('suma como ingreso solo las citas confirmadas', () => {
    const filas = resumirCitasPorServicio(citas)
    expect(filas.find((f) => f.servicioNombre === 'Consulta general').ingresos).toBe(28000)
  })
})

describe('calcularIngresos', () => {
  it('suma solo las citas confirmadas', () => {
    const citas = [
      { estado: 'confirmada', precioFinal: 12000 },
      { estado: 'pendiente', precioFinal: 99999 },
      { estado: 'confirmada', precioFinal: 28000 },
    ]
    expect(calcularIngresos(citas)).toBe(40000)
  })

  it('devuelve 0 si no hay citas', () => {
    expect(calcularIngresos([])).toBe(0)
  })
})