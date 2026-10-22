import EtiquetaEspecie from '../atoms/EtiquetaEspecie'
import EtiquetaOferta from '../atoms/EtiquetaOferta'
import Boton from '../atoms/Boton'
import { formatearPrecio, obtenerPrecioVigente, calcularPorcentajeDescuento } from '../../utils/precios'

export default function TarjetaServicio({ servicio, onSolicitar, onVerDetalle }) {
  return (
    <article className="card h-100 shadow-sm">
      <img src={servicio.imagen} alt={servicio.nombre} className="card-img-top tarjeta-img" />
      <div className="card-body d-flex flex-column">
        <h3 className="h5 card-title">{servicio.nombre}</h3>
        <p className="mb-2">
          <EtiquetaEspecie especie={servicio.especie} />{' '}
          {}
          {servicio.oferta && <EtiquetaOferta porcentaje={calcularPorcentajeDescuento(servicio)} />}
        </p>
        <p className="card-text text-muted small flex-grow-1">{servicio.observaciones}</p>
        <p className="fw-bold mb-3">
          {}
          {servicio.oferta && <s className="text-muted fw-normal me-2">{formatearPrecio(servicio.precio)}</s>}
          {formatearPrecio(obtenerPrecioVigente(servicio))} · {servicio.duracion} min
        </p>
        <div className="d-flex gap-2">
          {}
          {onVerDetalle && (
            <Boton variante="outline-primary" onClick={() => onVerDetalle(servicio)}>
              Ver detalle
            </Boton>
          )}
          <Boton onClick={() => onSolicitar(servicio)}>Solicitar cita</Boton>
        </div>
      </div>
    </article>
  )
}