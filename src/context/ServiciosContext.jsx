import { createContext, useContext, useEffect, useState } from 'react'
import * as servicioService from '../services/servicioService'
import { servicioRequestDto } from '../dto/servicio.dto'
import { obtenerMensajeError } from '../utils/errores'

const ServiciosContext = createContext(null)

export function ServiciosProvider({ children }) {
  const [servicios, setServicios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  async function recargar() {
    try {
      setServicios(await servicioService.listarServicios())
      setError('')
    } catch (e) {
      setError(obtenerMensajeError(e))
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    recargar()
  }, [])

  // Ejecuta una operación de la API, recarga la lista y devuelve { ok } o { ok: false, error }
  async function ejecutar(operacion) {
    try {
      await operacion()
      await recargar()
      return { ok: true }
    } catch (e) {
      return { ok: false, error: obtenerMensajeError(e) }
    }
  }

  function crear(datos) {
    return ejecutar(() => servicioService.crearServicio(servicioRequestDto(datos)))
  }

  // La API pide el servicio completo, así que se mezclan los cambios con los datos actuales.
  // Así sirve tanto para editar el formulario como para cambiar solo la categoría.
  function actualizar(id, cambios) {
    const actual = servicios.find((s) => s.id === id)
    return ejecutar(() => servicioService.actualizarServicio(id, servicioRequestDto({ ...actual, ...cambios })))
  }

  function eliminar(id) {
    return ejecutar(() => servicioService.eliminarServicio(id))
  }

  if (cargando) {
    return (
      <div className="container py-5" role="status">
        Cargando servicios...
      </div>
    )
  }

  return (
    <ServiciosContext.Provider value={{ servicios, error, recargar, crear, actualizar, eliminar }}>
      {children}
    </ServiciosContext.Provider>
  )
}

export function useServicios() {
  const contexto = useContext(ServiciosContext)
  if (!contexto) {
    throw new Error('useServicios debe usarse dentro de un ServiciosProvider')
  }
  return contexto
}