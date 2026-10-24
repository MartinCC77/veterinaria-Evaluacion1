import { useNavigate } from 'react-router-dom'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import TablaServiciosAdmin from '../components/organisms/TablaServiciosAdmin'
import Boton from '../components/atoms/Boton'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function AdminServicios() {
  const navigate = useNavigate()
  const { servicios, eliminar } = useServicios()
  useTituloPagina('Servicios (admin)')

  return (
    <PlantillaAdmin soloAdministrador>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h2 text-primary mb-0">Servicios</h1>
        <Boton onClick={() => navigate('/admin/servicios/nuevo')}>Nuevo servicio</Boton>
      </div>
      <TablaServiciosAdmin
        servicios={servicios}
        onEditar={(s) => navigate(`/admin/servicios/${s.id}/editar`)}
        onEliminar={(s) => eliminar(s.id)}
      />
    </PlantillaAdmin>
  )
}