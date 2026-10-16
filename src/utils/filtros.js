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