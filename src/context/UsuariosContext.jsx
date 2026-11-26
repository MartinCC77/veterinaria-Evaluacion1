import { createContext, useContext, useEffect, useState } from 'react'
import * as usuarioService from '../services/usuarioService'
import { usuarioRequestDto } from '../dto/usuario.dto'
import { obtenerMensajeError } from '../utils/errores'
import { useAuth } from './AuthContext'

const UsuariosContext = createContext(null)

export function UsuariosProvider({ children }) {
  const { usuario } = useAuth()
  const esAdmin = usuario?.rol === 'administrador'
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(esAdmin)

  // Solo el administrador puede listar usuarios: para los demás, el backend respondería 403
  async function recargar() {
    if (!esAdmin) {
      setUsuarios([])
      setCargando(false)
      return
    }
    setCargando(true)
    try {
      setUsuarios(await usuarioService.listarUsuarios())
    } catch {
      setUsuarios([])
    } finally {
      setCargando(false)
    }
  }

  // Carga la lista al iniciar sesión (o al recargar la página) y la vacía al cerrarla
  useEffect(() => {
    recargar()
  }, [usuario?.id, esAdmin])

  async function crear(datos) {
    try {
      await usuarioService.crearUsuario(usuarioRequestDto(datos))
      await recargar()
      return { ok: true }
    } catch (error) {
      return { ok: false, error: obtenerMensajeError(error) }
    }
  }

  async function actualizar(id, cambios) {
    try {
      await usuarioService.actualizarUsuario(id, usuarioRequestDto(cambios))
      await recargar()
      return { ok: true }
    } catch (error) {
      return { ok: false, error: obtenerMensajeError(error) }
    }
  }

  async function eliminar(id) {
    try {
      await usuarioService.eliminarUsuario(id)
      await recargar()
      return { ok: true }
    } catch (error) {
      return { ok: false, error: obtenerMensajeError(error) }
    }
  }

  return (
    <UsuariosContext.Provider value={{ usuarios, cargando, recargar, crear, actualizar, eliminar }}>
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