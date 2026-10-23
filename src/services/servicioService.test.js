import { describe, it, expect, beforeEach } from 'vitest'
import {
  listarServicios,
  obtenerServicio,
  crearServicio,
  actualizarServicio,
  eliminarServicio,
} from './servicioService'

describe('servicioService (CRUD con persistencia)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('lista los servicios iniciales la primera vez', () => {
    expect(listarServicios()).toHaveLength(5)
  })

  it('obtiene un servicio por id, o null si no existe', () => {
    expect(obtenerServicio(1).nombre).toBe('Consulta general')
    expect(obtenerServicio(999)).toBeNull()
  })

  it('crea un servicio con un id nuevo', () => {
    const nuevo = crearServicio({ nombre: 'Baño medicado', precio: 20000 })
    expect(nuevo.id).toBe(6)
    expect(listarServicios()).toHaveLength(6)
  })

  it('actualiza solo los campos indicados', () => {
    const actualizado = actualizarServicio(1, { precio: 20000 })
    expect(actualizado.precio).toBe(20000)
    expect(actualizado.nombre).toBe('Consulta general')
  })

  it('elimina un servicio', () => {
    eliminarServicio(1)
    expect(obtenerServicio(1)).toBeNull()
    expect(listarServicios()).toHaveLength(4)
  })

  it('conserva los cambios en localStorage', () => {
    crearServicio({ nombre: 'Baño medicado', precio: 20000 })
    const guardado = JSON.parse(localStorage.getItem('servicios'))
    expect(guardado).toHaveLength(6)
  })
})