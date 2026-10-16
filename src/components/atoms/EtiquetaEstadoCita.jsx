const ESTADOS = {
  pendiente: { texto: 'Pendiente', color: 'warning' },
  confirmada: { texto: 'Confirmada', color: 'success' },
  reagendada: { texto: 'Nuevo horario propuesto', color: 'info' },
  cancelada: { texto: 'Cancelada', color: 'secondary' },
}

export default function EtiquetaEstadoCita({ estado }) {

  const { texto, color } = ESTADOS[estado] ?? ESTADOS.pendiente
  return <span className={`badge text-bg-${color}`}>{texto}</span>
}