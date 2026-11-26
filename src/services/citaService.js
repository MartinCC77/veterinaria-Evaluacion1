import { api } from './api'

// El servidor decide qué citas devuelve: el personal ve todas y el dueño solo las suyas
export async function listarCitas(estado) {
  const respuesta = await api.get('/citas', { params: estado ? { estado } : {} })
  return respuesta.data
}

export async function obtenerCita(id) {
  const respuesta = await api.get(`/citas/${id}`)
  return respuesta.data
}

export async function crearCita(dto) {
  const respuesta = await api.post('/citas', dto)
  return respuesta.data
}

// Solo personal. Responde 409 si el horario ya está ocupado por otra cita confirmada
export async function confirmarCita(id) {
  const respuesta = await api.patch(`/citas/${id}/confirmar`)
  return respuesta.data
}

// Solo personal. Propone otro horario (también puede responder 409)
export async function reagendarCita(id, dto) {
  const respuesta = await api.patch(`/citas/${id}/reagendar`, dto)
  return respuesta.data
}

// El personal o el dueño de la cita
export async function cancelarCita(id) {
  const respuesta = await api.patch(`/citas/${id}/cancelar`)
  return respuesta.data
}