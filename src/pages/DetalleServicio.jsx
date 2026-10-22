import { useNavigate, useParams } from 'react-router-dom'
import LayoutPrincipal from '../components/templates/LayoutPrincipal'
import Boton from '../components/atoms/Boton'
import EtiquetaEspecie from '../components/atoms/EtiquetaEspecie'
import EtiquetaOferta from '../components/atoms/EtiquetaOferta'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { formatearPrecio, obtenerPrecioVigente, calcularPorcentajeDescuento } from '../utils/precios'

export default function DetalleServicio() {
  const navigate = useNavigate()
  const params = useParams()
  const { servicios } = useServicios()
  useTituloPagina('Detalle del servicio')

  const servicio = servicios.find((s) => s.id === Number(params.id))

  if (!servicio) {
    return (
      <LayoutPrincipal>
        <div className="alert alert-danger" role="alert">
          <h1 className="h4">Servicio no encontrado</h1>
          <p className="mb-0">No existe un servicio con el código "{params.id}".</p>
        </div>
        <Boton onClick={() => navigate('/servicios')}>Ver todos los servicios</Boton>
      </LayoutPrincipal>
    )
  }

  return (
    <LayoutPrincipal>
      <div className="row g-4">
        <div className="col-12 col-md-5">
          <img src={servicio.imagen} alt={servicio.nombre} className="img-fluid rounded shadow-sm" />
        </div>
        <div className="col-12 col-md-7">
          <h1 className="h2 text-primary">{servicio.nombre}</h1>
          <p>
            <span className="badge text-bg-secondary me-1">{servicio.categoria}</span>
            <EtiquetaEspecie especie={servicio.especie} />{' '}
            {servicio.oferta && <EtiquetaOferta porcentaje={calcularPorcentajeDescuento(servicio)} />}
          </p>
          <p>{servicio.observaciones}</p>
          <p className="mb-1">Duración: {servicio.duracion} minutos</p>
          <p className="h4 mb-4">
            {servicio.oferta && <s className="text-muted fs-6 me-2">{formatearPrecio(servicio.precio)}</s>}
            {formatearPrecio(obtenerPrecioVigente(servicio))}
          </p>
          <div className="d-flex gap-2">
            <Boton onClick={() => navigate(`/solicitar-cita/${servicio.id}`)}>Solicitar cita</Boton>
            {}
            <Boton variante="outline-primary" onClick={() => navigate(-1)}>
              Volver
            </Boton>
          </div>
        </div>
      </div>
    </LayoutPrincipal>
  )
}