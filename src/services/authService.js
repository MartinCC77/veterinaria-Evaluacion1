import { api } from './api'

// POST /auth/login -> { token, tipo, usuario }
export async function login(dto) {
  const respuesta = await api.post('/auth/login', dto)
  return respuesta.data
}

// POST /auth/registro -> el usuario creado (el rol lo asigna el servidor)
export async function registro(dto) {
  const respuesta = await api.post('/auth/registro', dto)
  return respuesta.data
}