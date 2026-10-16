import { useNavigate, useParams } from 'react-router-dom'
import LayoutPrincipal from '../components/templates/LayoutPrincipal'
import Boton from '../components/atoms/Boton'
import EtiquetaEstadoCita from '../components/atoms/EtiquetaEstadoCita'
import { useCitas } from '../context/CitasContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { formatearPrecio } from '../utils/precios'

export default function CitaConfirmada() {
  const navigate = useNavigate()
  const params = useParams()
  const { citas } = useCitas()
  useTituloPagina('Resultado de la solicitud')


  const cita = citas.find((c) => c.id === Number(params.id))


  if (!cita) {
    return (
      <LayoutPrincipal>
        <div className="alert alert-danger" role="alert">
          <h1 className="h4">No encontramos tu solicitud</h1>
          <p className="mb-0">Puede que se haya eliminado o que la dirección esté mal escrita.</p>
        </div>
        <Boton onClick={() => navigate('/solicitar-cita')}>Intentar de nuevo</Boton>
      </LayoutPrincipal>
    )
  }


  return (
    <LayoutPrincipal>
      <div className="alert alert-success" role="alert">
        <h1 className="h4">¡Solicitud enviada con éxito!</h1>
        <p className="mb-0">Tu solicitud N° {cita.id} quedó registrada. La recepción la confirmará o te propondrá otro horario.</p>
      </div>

      <div className="card card-body mb-3">
        <p className="mb-1">
          <strong>Estado:</strong> <EtiquetaEstadoCita estado={cita.estado} />
        </p>
        <p className="mb-1"><strong>Mascota:</strong> {cita.mascota}</p>
        <p className="mb-1"><strong>Servicio:</strong> {cita.servicioNombre}</p>
        <p className="mb-1"><strong>Fecha y hora:</strong> {cita.fecha} a las {cita.hora}</p>
        <p className="mb-0"><strong>Precio estimado:</strong> {formatearPrecio(cita.precioFinal)}</p>
      </div>

      <Boton onClick={() => navigate('/mis-citas')}>Ver mis citas</Boton>
    </LayoutPrincipal>
  )
}