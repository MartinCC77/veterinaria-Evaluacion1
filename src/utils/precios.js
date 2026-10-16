export const RECARGO_URGENCIA = 10000


export function formatearPrecio(valor) {
  return '$' + valor.toLocaleString('es-CL')
}

export function calcularPrecioCita(precioBase, esUrgencia) {
  if (precioBase < 0) {
    throw new Error('El precio base no puede ser negativo')
  }
  return esUrgencia ? precioBase + RECARGO_URGENCIA : precioBase
}