import { useNavigate, useParams } from 'react-router-dom'
import LayoutPrincipal from '../components/templates/LayoutPrincipal'
import ListaServicios from '../components/organisms/ListaServicios'
import Boton from '../components/atoms/Boton'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { filtrarServicios } from '../utils/filtros'

export default function Categoria() {
  const navigate = useNavigate()
  const params = useParams()
  const { servicios } = useServicios()
  useTituloPagina(params.nombre)

  const visibles = filtrarServicios(servicios, '', params.nombre)

  return (
    <LayoutPrincipal>
      <h1 className="h2 text-primary mb-3">{params.nombre}</h1>
      <ListaServicios
        servicios={visibles}
        onSolicitar={(s) => navigate(`/solicitar-cita/${s.id}`)}
        onVerDetalle={(s) => navigate(`/servicios/${s.id}`)}
      />
      <div className="mt-4">
        <Boton variante="outline-primary" onClick={() => navigate('/categorias')}>
          Ver todas las categorías
        </Boton>
      </div>
    </LayoutPrincipal>
  )
}