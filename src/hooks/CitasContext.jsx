import { createContext, useContext, useState } from 'react'
import * as citaService from '../services/citaService'

const CitasContext = createContext(null)

export function CitasProvider({ children }) {
  const [citas, setCitas] = useState(() => citaService.listarCitas())

  function crear(datos) {
    const nueva = citaService.crearCita(datos)
    setCitas(citaService.listarCitas())
    return nueva
  }

  function actualizar(id, cambios) {
    citaService.actualizarCita(id, cambios)
    setCitas(citaService.listarCitas())
  }

  function eliminar(id) {
    citaService.eliminarCita(id)
    setCitas(citaService.listarCitas())
  }

  return (
    <CitasContext.Provider value={{ citas, crear, actualizar, eliminar }}>
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