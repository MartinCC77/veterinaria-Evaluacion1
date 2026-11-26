import { api } from './api'

// Una función por operación de la API. Ver el catálogo es público; modificarlo exige ser administrador

export async function listarServicios() {
  const respuesta = await api.get('/servicios')
  return respuesta.data
}

export async function obtenerServicio(id) {
  const respuesta = await api.get(`/servicios/${id}`)
  return respuesta.data
}

export async function crearServicio(dto) {
  const respuesta = await api.post('/servicios', dto)
  return respuesta.data
}

export async function actualizarServicio(id, dto) {
  const respuesta = await api.put(`/servicios/${id}`, dto)
  return respuesta.data
}

// La API responde 204 sin cuerpo
export async function eliminarServicio(id) {
  await api.delete(`/servicios/${id}`)
}