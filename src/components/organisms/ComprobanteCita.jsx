import EtiquetaEstadoCita from '../atoms/EtiquetaEstadoCita'
import { formatearPrecio } from '../../utils/precios'

export default function ComprobanteCita({ cita }) {
  return (
    <article className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 text-primary">Comprobante de solicitud N° {cita.id}</h2>
        <dl className="row mb-0">
          <dt className="col-sm-4">Estado</dt>
          <dd className="col-sm-8">
            <EtiquetaEstadoCita estado={cita.estado} />
          </dd>
          <dt className="col-sm-4">Dueño</dt>
          <dd className="col-sm-8">
            {cita.dueno} ({cita.correo})
          </dd>
          <dt className="col-sm-4">Mascota</dt>
          <dd className="col-sm-8">
            {cita.mascota} ({cita.especie})
          </dd>
          <dt className="col-sm-4">Servicio</dt>
          <dd className="col-sm-8">{cita.servicioNombre}</dd>
          <dt className="col-sm-4">Fecha y hora</dt>
          <dd className="col-sm-8">
            {cita.fecha} a las {cita.hora}
          </dd>
          <dt className="col-sm-4">Motivo</dt>
          <dd className="col-sm-8">{cita.motivo}</dd>
          <dt className="col-sm-4">Urgencia fuera de horario</dt>
          <dd className="col-sm-8">{cita.urgencia ? 'Sí (recargo de $10.000)' : 'No'}</dd>
          <dt className="col-sm-4">Total estimado</dt>
          <dd className="col-sm-8 fw-bold">{formatearPrecio(cita.precioFinal)}</dd>
        </dl>
      </div>
    </article>
  )
}