export function contarCitasPorEstado(citas) {
  const conteo = { pendiente: 0, confirmada: 0, reagendada: 0, cancelada: 0 }
  citas.forEach((c) => {
    if (c.estado in conteo) {
      conteo[c.estado] += 1
    }
  })
  return conteo
}