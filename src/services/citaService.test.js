import { describe, it, expect, beforeEach } from 'vitest'
import { listarCitas, obtenerCita, crearCita, actualizarCita, eliminarCita } from './citaService'

const datosCita = { mascota: 'Cachulo', servicioNombre: 'Vacunación', fecha: '2026-10-20', hora: '10:00' }

describe('citaService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('parte con una lista vacía', () => {
    expect(listarCitas()).toEqual([])
  })

  it('crea una cita con id y estado pendiente', () => {
    const cita = crearCita(datosCita)
    expect(cita.id).toBe(1)
    expect(cita.estado).toBe('pendiente')
    expect(obtenerCita(1).mascota).toBe('Cachulo')
  })

  it('no deja que los datos de entrada cambien el estado inicial', () => {
    const cita = crearCita({ ...datosCita, estado: 'confirmada' })
    expect(cita.estado).toBe('pendiente')
  })

  it('actualiza el estado de una cita', () => {
    crearCita(datosCita)
    const actualizada = actualizarCita(1, { estado: 'confirmada' })
    expect(actualizada.estado).toBe('confirmada')
  })

  it('elimina una cita', () => {
    crearCita(datosCita)
    eliminarCita(1)
    expect(listarCitas()).toEqual([])
  })
})