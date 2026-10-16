import FilaCita from '../molecules/FilaCita'

export default function TablaCitas({ citas }) {
  if (citas.length === 0) {
    return <p className="text-muted">Aún no tienes citas solicitadas.</p>
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle bg-white">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Mascota</th>
            <th>Especie</th>
            <th>Servicio</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((c) => (
            <FilaCita key={c.id} cita={c} />
          ))}
        </tbody>
      </table>
    </div>
  )
}