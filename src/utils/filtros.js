export function filtrarServicios(servicios, texto, categoria) {
  const buscado = texto.trim().toLowerCase()

  return servicios.filter((s) => {
    
    const coincideTexto = buscado === '' || s.nombre.toLowerCase().includes(buscado)
 
    const coincideCategoria = categoria === '' || s.categoria === categoria
    return coincideTexto && coincideCategoria
  })
}


export function obtenerCategorias(servicios) {

  return [...new Set(servicios.map((s) => s.categoria))]
}

export function fechaHoy() {
  const ahora = new Date()
  const mes = String(ahora.getMonth() + 1).padStart(2, '0')
  const dia = String(ahora.getDate()).padStart(2, '0')
  return `${ahora.getFullYear()}-${mes}-${dia}`
}


export function obtenerOfertas(servicios) {
  return servicios.filter((s) => s.oferta)
}

export function contarPorCategoria(servicios) {
  return obtenerCategorias(servicios).map((nombre) => ({
    nombre,
    cantidad: servicios.filter((s) => s.categoria === nombre).length,
  }))
}

export function filtrarCitasDeUsuario(citas, usuario) {
  if (usuario.rol === 'dueno') {
    return citas.filter((c) => c.usuarioId === usuario.id)
  }
  return citas
}

export function filtrarCitasPorEstado(citas, estado) {
  if (estado === '') {
    return citas
  }
  return citas.filter((c) => c.estado === estado)
}

export function resumirCategorias(categorias, servicios) {
  return categorias.map((nombre) => ({
    nombre,
    cantidad: servicios.filter((s) => s.categoria === nombre).length,
  }))
}

// citasDelUsuario: las citas pedidas por un usuario (para su historial).
export function citasDelUsuario(citas, usuarioId) {
  return citas.filter((c) => c.usuarioId === usuarioId)
}