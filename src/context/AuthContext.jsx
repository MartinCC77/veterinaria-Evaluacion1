import { createContext, useContext, useState } from 'react'
import * as usuarioService from '../services/usuarioService'
import * as sesionService from '../services/sesionService'

const AuthContext = createContext(null)

function recuperarUsuario() {
  const id = sesionService.obtenerSesion()
  if (id === null) {
    return null
  }
  const usuario = usuarioService.obtenerUsuario(id)
  return usuario ? usuarioService.quitarClave(usuario) : null
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(recuperarUsuario)

  function iniciarSesion(correo, clave) {
    const encontrado = usuarioService.autenticar(correo, clave)
    if (!encontrado) {
      return { ok: false, error: 'Correo o clave incorrectos.' }
    }
    sesionService.guardarSesion(encontrado.id)
    setUsuario(encontrado)
    return { ok: true }
  }

  function registrar(datos) {
    try {
      const nuevo = usuarioService.crearUsuario(datos)
      sesionService.guardarSesion(nuevo.id)
      setUsuario(nuevo)
      return { ok: true }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  function cerrarSesion() {
    sesionService.cerrarSesion()
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, registrar, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const contexto = useContext(AuthContext)
  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return contexto
}