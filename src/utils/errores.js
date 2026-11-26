// Convierte un error de Axios en un mensaje para mostrar en pantalla.
// Distingue los tres casos: el servidor respondió con error, se agotó el tiempo, o no hubo respuesta.
export function obtenerMensajeError(error) {
  if (error.response) {
    const datos = error.response.data
    if (datos && typeof datos.mensaje === 'string') {
      return datos.mensaje
    }
    if (error.response.status === 403) {
      return 'No tienes permiso para realizar esta acción.'
    }
    if (error.response.status === 401) {
      return 'Tu sesión venció. Vuelve a iniciar sesión.'
    }
    return 'La API respondió con un error ' + error.response.status + '.'
  }
  if (error.code === 'ECONNABORTED') {
    return 'La API tardó demasiado en responder. Intenta de nuevo.'
  }
  return 'No fue posible contactar la API. Revisa tu conexión.'
}