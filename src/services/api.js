import axios from 'axios'
import { obtenerToken, cerrarSesion } from './sesionService'

// Instancia única de Axios: la dirección base viene del archivo .env
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/v1',
  timeout: 10000,
})

// Antes de cada solicitud: si hay sesión, agrega el token en el encabezado Authorization
api.interceptors.request.use((config) => {
  const token = obtenerToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Después de cada respuesta: si el servidor dice 401 (token vencido o inválido),
// se limpia la sesión y se avisa a la aplicación. El login mismo puede dar 401
// por clave incorrecta, y ese caso no cuenta como sesión vencida.
api.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    const url = error.config?.url ?? ''
    if (error.response?.status === 401 && !url.includes('/auth/')) {
      cerrarSesion()
      window.dispatchEvent(new Event('sesion-expirada'))
    }
    return Promise.reject(error)
  },
)