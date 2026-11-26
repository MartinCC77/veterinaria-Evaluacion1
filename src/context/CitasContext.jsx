import { createContext, useContext, useEffect, useState } from 'react'
import * as citaService from '../services/citaService'
import { citaRequestDto, reagendarRequestDto } from '../dto/cita.dto'
import { obtenerMensajeError } from '../utils/errores'
import { useAuth } from './AuthContext'

const CitasContext = createContext(null)

export function CitasProvider({ children }) {
  const { usuario } = useAuth()
  const [citas, setCitas] = useState([])
  const [cargando, setCargando] = useState(usuario !== null)

  // Sin sesión no hay citas que cargar. Con sesión, el servidor devuelve solo las que le corresponden
  async function recargar() {
    if (usuario === null) {
      setCitas([])
      setCargando(false)
      return
    }
    setCargando(true)
    try {
      setCitas(await citaService.listarCitas())
    } catch {
      setCitas([])
    } finally {
      setCargando(false)
    }
  }

  // Se vuelve a cargar al iniciar o cerrar sesión (y al recargar la página)
  useEffect(() => {
    recargar()
  }, [usuario?.id])

  // Ejecuta una operación, recarga las citas y devuelve { ok, datos } o { ok: false, error }
  async function ejecutar(operacion) {
    try {
      const datos = await operacion()
      await recargar()
      return { ok: true, datos }
    } catch (e) {
      return { ok: false, error: obtenerMensajeError(e) }
    }
  }

  function crear(datos) {
    return ejecutar(() => citaService.crearCita(citaRequestDto(datos)))
  }

  function confirmar(id) {
    return ejecutar(() => citaService.confirmarCita(id))
  }

  function reagendar(id, horario) {
    return ejecutar(() => citaService.reagendarCita(id, reagendarRequestDto(horario)))
  }

  function cancelar(id) {
    return ejecutar(() => citaService.cancelarCita(id))
  }

  return (
    <CitasContext.Provider value={{ citas, cargando, recargar, crear, confirmar, reagendar, cancelar }}>
      {children}
    </CitasContext.Provider>
  )
}

export function useCitas() {
  const contexto = useContext(CitasContext)
  if (!contexto) {
    throw new Error('useCitas debe usarse dentro de un CitasProvider')
  }
  return contexto
}