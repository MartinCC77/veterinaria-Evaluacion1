const CLAVE = 'sesion'


// Lee la parte central (payload) del JWT para saber cuándo vence
function decodificar(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(base64))
  } catch {
    return null
  }
}

// El token es vigente si tiene fecha de vencimiento (exp, en segundos) y todavía no pasa
export function tokenVigente(token) {
  const datos = decodificar(token)
  return datos !== null && typeof datos.exp === 'number' && datos.exp * 1000 > Date.now()
}

export function guardarSesion(sesion) {
  sessionStorage.setItem(CLAVE, JSON.stringify(sesion))
}

// Devuelve { token, usuario } o null. Si el token venció o está dañado, borra la sesión
export function obtenerSesion() {
  const guardado = sessionStorage.getItem(CLAVE)
  if (guardado === null) {
    return null
  }
  try {
    const sesion = JSON.parse(guardado)
    if (!sesion.token || !tokenVigente(sesion.token)) {
      cerrarSesion()
      return null
    }
    return sesion
  } catch {
    cerrarSesion()
    return null
  }
}

export function obtenerToken() {
  return obtenerSesion()?.token ?? null
}

export function cerrarSesion() {
  sessionStorage.removeItem(CLAVE)
}