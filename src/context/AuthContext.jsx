import { createContext, useContext, useEffect, useState } from 'react'
import * as authService from '../services/authService'
import * as usuarioService from '../services/usuarioService'
import * as sesionService from '../services/sesionService'
import { loginRequestDto, registroRequestDto } from '../dto/usuario.dto'
import { obtenerMensajeError } from '../utils/errores'

const AuthContext = createContext(null)

// Al cargar la página (o recargarla) se recupera el usuario guardado, si el token sigue vigente
function recuperarUsuario() {
  return sesionService.obtenerSesion()?.usuario ?? null
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(recuperarUsuario)

  // Axios avisa con este evento cuando el servidor responde 401 (token vencido o inválido)
  useEffect(() => {
    const alExpirar = () => setUsuario(null)
    window.addEventListener('sesion-expirada', alExpirar)
    return () => window.removeEventListener('sesion-expirada', alExpirar)
  }, [])

  async function iniciarSesion(correo, clave) {
    try {
      const datos = await authService.login(loginRequestDto({ correo, clave }))
      sesionService.guardarSesion({ token: datos.token, usuario: datos.usuario })
      setUsuario(datos.usuario)
      return { ok: true, usuario: datos.usuario }
    } catch (error) {
      return { ok: false, error: obtenerMensajeError(error) }
    }
  }

  // Crea la cuenta y, si sale bien, inicia sesión automáticamente
  async function registrar(datos) {
    try {
      await authService.registro(registroRequestDto(datos))
    } catch (error) {
      return { ok: false, error: obtenerMensajeError(error) }
    }
    return iniciarSesion(datos.correo, datos.clave)
  }

  // El perfil cambia nombre y, opcionalmente, la clave. El correo y el rol no se tocan
  async function actualizarPerfil(cambios) {
    try {
      const dto = { nombre: cambios.nombre, correo: usuario.correo }
      if (cambios.clave) {
        dto.contrasena = cambios.clave
      }
      const actualizado = await usuarioService.actualizarUsuario(usuario.id, dto)
      sesionService.guardarSesion({ ...sesionService.obtenerSesion(), usuario: actualizado })
      setUsuario(actualizado)
      return { ok: true }
    } catch (error) {
      return { ok: false, error: obtenerMensajeError(error) }
    }
  }

  function cerrarSesion() {
    sesionService.cerrarSesion()
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, registrar, actualizarPerfil, cerrarSesion }}>
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