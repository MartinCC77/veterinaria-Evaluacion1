import { formatearPrecio } from '../../utils/precios'

export default function TablaReporteServicios({ filas }) {
  if (filas.length === 0) {
    return <p className="text-muted">Aún no hay solicitudes para reportar.</p>
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle bg-white">
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Solicitudes</th>
            <th>Ingresos confirmados</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((f) => (
            <tr key={f.servicioNombre}>
              <td>{f.servicioNombre}</td>
              <td>{f.cantidad}</td>
              <td>{formatearPrecio(f.ingresos)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}