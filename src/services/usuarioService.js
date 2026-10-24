import usuariosIniciales from '../data/usuarios.json'

const CLAVE = 'usuarios'

function leer() {
  const guardado = localStorage.getItem(CLAVE)
  if (guardado === null) {
    localStorage.setItem(CLAVE, JSON.stringify(usuariosIniciales))
    return [...usuariosIniciales]
  }
  return JSON.parse(guardado)
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

export function quitarClave(usuario) {
  const publico = { ...usuario }
  delete publico.clave
  return publico
}

// READ: todos los usuarios.
export function listarUsuarios() {
  return leer()
}

export function obtenerUsuario(id) {
  return leer().find((u) => u.id === id) ?? null
}

export function crearUsuario(datos) {
  const lista = leer()

  const correo = datos.correo.trim().toLowerCase()

  if (lista.some((u) => u.correo === correo)) {
    throw new Error('Ya existe una cuenta con ese correo')
  }

  const nuevoId = Math.max(0, ...lista.map((u) => u.id)) + 1

  const nuevo = { rol: 'dueno', ...datos, correo, id: nuevoId }
  guardar([...lista, nuevo])
  return quitarClave(nuevo)
}

export function actualizarUsuario(id, cambios) {
  const lista = leer().map((u) => (u.id === id ? { ...u, ...cambios } : u))
  guardar(lista)
  const actualizado = lista.find((u) => u.id === id)
  return actualizado ? quitarClave(actualizado) : null
}

export function eliminarUsuario(id) {
  guardar(leer().filter((u) => u.id !== id))
}

export function autenticar(correo, clave) {
  const buscado = correo.trim().toLowerCase()
  const encontrado = leer().find((u) => u.correo === buscado && u.clave === clave)
  return encontrado ? quitarClave(encontrado) : null
}