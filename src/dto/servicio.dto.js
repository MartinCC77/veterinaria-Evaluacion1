// Arma el cuerpo exacto que exige la API para crear o modificar un servicio.
// Si el servicio no está en oferta, el precio de oferta viaja vacío.
export function servicioRequestDto(formulario) {
  return {
    codigo: formulario.codigo,
    categoria: formulario.categoria,
    nombre: formulario.nombre,
    especie: formulario.especie,
    duracion: formulario.duracion,
    precio: formulario.precio,
    oferta: Boolean(formulario.oferta),
    precioOferta: formulario.oferta ? formulario.precioOferta : null,
    observaciones: formulario.observaciones,
    imagen: formulario.imagen,
  }
}