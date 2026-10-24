import { useNavigate, useParams } from 'react-router-dom'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import FormularioServicio from '../components/organisms/FormularioServicio'
import Boton from '../components/atoms/Boton'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { obtenerCategorias } from '../utils/filtros'

export default function AdminServicioForm() {
  const navigate = useNavigate()
  const params = useParams() 
  const { servicios, crear, actualizar } = useServicios()
  useTituloPagina('Formulario de servicio')

  const editando = params.id !== undefined
  const servicio = editando ? servicios.find((s) => s.id === Number(params.id)) : null

  if (editando && !servicio) {
    return (
      <PlantillaAdmin soloAdministrador>
        <div className="alert alert-danger" role="alert">
          Servicio no encontrado.
        </div>
        <Boton onClick={() => navigate('/admin/servicios')}>Volver a servicios</Boton>
      </PlantillaAdmin>
    )
  }

  function guardar(datos) {
    if (editando) {
      actualizar(servicio.id, datos)
    } else {
      crear(datos)
    }
    navigate('/admin/servicios')
  }

  return (
    <PlantillaAdmin soloAdministrador>
      <h1 className="h2 text-primary mb-3">{editando ? 'Editar servicio' : 'Nuevo servicio'}</h1>
      <FormularioServicio servicio={servicio} categorias={obtenerCategorias(servicios)} onEnviar={guardar} />
    </PlantillaAdmin>
  )
}