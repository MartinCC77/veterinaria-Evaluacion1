import EtiquetaEspecie from '../atoms/EtiquetaEspecie'
import Boton from '../atoms/Boton'
import { formatearPrecio } from '../../utils/precios'

export default function TarjetaServicio({ servicio, onSolicitar }) {
  return (
    <article className="card h-100 shadow-sm">
      <img src={servicio.imagen} alt={servicio.nombre} className="card-img-top tarjeta-img" />
      <div className="card-body d-flex flex-column">
        <h3 className="h5 card-title">{servicio.nombre}</h3>
        <p className="mb-2">
          <EtiquetaEspecie especie={servicio.especie} />
        </p>
        <p className="card-text text-muted small flex-grow-1">{servicio.observaciones}</p>
        <p className="fw-bold mb-3">
          {formatearPrecio(servicio.precio)} · {servicio.duracion} min
        </p>
        {/* Al hacer clic avisamos al padre y le pasamos el servicio elegido */}
        <Boton onClick={() => onSolicitar(servicio)}>Solicitar cita</Boton>
      </div>
    </article>
  )
}