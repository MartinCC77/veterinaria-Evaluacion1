export function contarCitasPorEstado(citas) {
  const conteo = { pendiente: 0, confirmada: 0, reagendada: 0, cancelada: 0 }
  citas.forEach((c) => {
    if (c.estado in conteo) {
      conteo[c.estado] += 1
    }
  })
  return conteo
}


export const UMBRAL_CRITICO = 2

export function contarPendientesPorServicio(servicios, citas) {
  return servicios
    .map((servicio) => {
      const pendientes = citas.filter((c) => c.servicioId === servicio.id && c.estado === 'pendiente').length
      return { servicio, pendientes, critico: pendientes >= UMBRAL_CRITICO }
    })
    .sort((a, b) => b.pendientes - a.pendientes)
}

export function resumirCitasPorServicio(citas) {
  const grupos = {}
  citas.forEach((c) => {
    if (!grupos[c.servicioNombre]) {
      grupos[c.servicioNombre] = { servicioNombre: c.servicioNombre, cantidad: 0, ingresos: 0 }
    }
    grupos[c.servicioNombre].cantidad += 1
    if (c.estado === 'confirmada') {
      grupos[c.servicioNombre].ingresos += c.precioFinal
    }
  })
  return Object.values(grupos).sort((a, b) => b.cantidad - a.cantidad)
}

export function calcularIngresos(citas) {
  return citas.filter((c) => c.estado === 'confirmada').reduce((total, c) => total + c.precioFinal, 0)
}