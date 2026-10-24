import { useNavigate, useParams } from 'react-router-dom'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import ComprobanteCita from '../components/organisms/ComprobanteCita'
import Boton from '../components/atoms/Boton'
import { useCitas } from '../context/CitasContext'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function AdminCita() {
  const navigate = useNavigate()
  const params = useParams()
  const { citas } = useCitas()
  useTituloPagina('Comprobante de solicitud')

  const cita = citas.find((c) => c.id === Number(params.id))

  return (
    <PlantillaAdmin>
      {cita ? (
        <ComprobanteCita cita={cita} />
      ) : (
        <div className="alert alert-danger" role="alert">
          No existe la solicitud N° {params.id}.
        </div>
      )}
      <div className="mt-3">
        <Boton variante="outline-primary" onClick={() => navigate('/admin/citas')}>
          Volver a las solicitudes
        </Boton>
      </div>
    </PlantillaAdmin>
  )
}