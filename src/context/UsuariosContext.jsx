import { createContext, useContext, useState } from 'react'
import * as usuarioService from '../services/usuarioService'

const UsuariosContext = createContext(null)

function leerPublicos() {
  return usuarioService.listarUsuarios().map(usuarioService.quitarClave)
}

export function UsuariosProvider({ children }) {
  const [usuarios, setUsuarios] = useState(leerPublicos)

  function recargar() {
    setUsuarios(leerPublicos())
  }

  function crear(datos) {
    try {
      usuarioService.crearUsuario(datos)
      recargar()
      return { ok: true }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  function actualizar(id, cambios) {
    try {
      usuarioService.actualizarUsuario(id, cambios)
      recargar()
      return { ok: true }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  function eliminar(id) {
    usuarioService.eliminarUsuario(id)
    recargar()
  }

  return (
    <UsuariosContext.Provider value={{ usuarios, recargar, crear, actualizar, eliminar }}>
      {children}
    </UsuariosContext.Provider>
  )
}

export function useUsuarios() {
  const contexto = useContext(UsuariosContext)
  if (!contexto) {
    throw new Error('useUsuarios debe usarse dentro de un UsuariosProvider')
  }
  return contexto
}