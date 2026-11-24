const CLAVE = 'sesion'

export function guardarSesion(idUsuario) {
  localStorage.setItem(CLAVE, JSON.stringify(idUsuario))
}

export function obtenerSesion() {
  const guardado = localStorage.getItem(CLAVE)
  return guardado === null ? null : JSON.parse(guardado)
}

// cerrarSesion: borra el id guardado.
export function cerrarSesion() {
  localStorage.removeItem(CLAVE)
}