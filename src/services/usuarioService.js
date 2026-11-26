import { api } from './api'

// Una función por operación de la API. Todas devuelven respuesta.data

export async function listarUsuarios() {
  const respuesta = await api.get('/usuarios')
  return respuesta.data
}

export async function obtenerUsuario(id) {
  const respuesta = await api.get(`/usuarios/${id}`)
  return respuesta.data
}

export async function crearUsuario(dto) {
  const respuesta = await api.post('/usuarios', dto)
  return respuesta.data
}

export async function actualizarUsuario(id, dto) {
  const respuesta = await api.put(`/usuarios/${id}`, dto)
  return respuesta.data
}

// La API responde 204 sin cuerpo
export async function eliminarUsuario(id) {
  await api.delete(`/usuarios/${id}`)
}