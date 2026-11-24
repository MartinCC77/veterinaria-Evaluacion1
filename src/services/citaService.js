const CLAVE = 'citas'


function leer() {
  const guardado = localStorage.getItem(CLAVE)

  if (guardado === null) {
    return []
  }
  return JSON.parse(guardado)
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}


export function listarCitas() {
  return leer()
}


export function obtenerCita(id) {
  return leer().find((c) => c.id === id) ?? null
}

export function crearCita(datos) {
  const lista = leer()
  const nuevoId = Math.max(0, ...lista.map((c) => c.id)) + 1
  const nueva = { ...datos, id: nuevoId, estado: 'pendiente', creadaEn: new Date().toISOString() }
  guardar([...lista, nueva])
  return nueva
}

export function actualizarCita(id, cambios) {
  const lista = leer().map((c) => (c.id === id ? { ...c, ...cambios } : c))
  guardar(lista)
  return lista.find((c) => c.id === id) ?? null
}


export function eliminarCita(id) {
  guardar(leer().filter((c) => c.id !== id))
}