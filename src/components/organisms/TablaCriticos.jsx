export default function TablaCriticos({ filas }) {
  if (filas.length === 0) {
    return <p className="text-muted">No hay servicios para mostrar.</p>
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle bg-white">
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Categoría</th>
            <th>Solicitudes pendientes</th>
            <th>Situación</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((f) => (
            <tr key={f.servicio.id}>
              <td>{f.servicio.nombre}</td>
              <td>{f.servicio.categoria}</td>
              <td>{f.pendientes}</td>
              <td>
                {f.critico ? <span className="badge text-bg-danger">Crítico</span> : <span className="badge text-bg-success">Normal</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}