import categoriasIniciales from '../data/categorias.json'

const CLAVE = 'categorias'

function leer() {
  const guardado = localStorage.getItem(CLAVE)
  if (guardado === null) {
    localStorage.setItem(CLAVE, JSON.stringify(categoriasIniciales))
    return [...categoriasIniciales]
  }
  return JSON.parse(guardado)
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

function existe(lista, nombre) {
  const buscado = nombre.trim().toLowerCase()
  return lista.some((c) => c.toLowerCase() === buscado)
}

export function listarCategorias() {
  return leer()
}

export function crearCategoria(nombre) {
  const lista = leer()
  if (existe(lista, nombre)) {
    throw new Error('Ya existe una categoría con ese nombre')
  }
  guardar([...lista, nombre.trim()])
  return nombre.trim()
}

export function renombrarCategoria(nombreActual, nombreNuevo) {
  const lista = leer()
  const otras = lista.filter((c) => c !== nombreActual)
  if (existe(otras, nombreNuevo)) {
    throw new Error('Ya existe una categoría con ese nombre')
  }
  guardar(lista.map((c) => (c === nombreActual ? nombreNuevo.trim() : c)))
  return nombreNuevo.trim()
}