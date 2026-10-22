import { useNavigate } from 'react-router-dom'
import LayoutPrincipal from '../components/templates/LayoutPrincipal'
import ListaServicios from '../components/organisms/ListaServicios'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { obtenerOfertas } from '../utils/filtros'

export default function Ofertas() {
  const navigate = useNavigate()
  const { servicios } = useServicios()
  useTituloPagina('Ofertas')

  const ofertas = obtenerOfertas(servicios)

  return (
    <LayoutPrincipal>
      <h1 className="h2 text-primary mb-3">Ofertas</h1>
      {ofertas.length === 0 ? (
        <p className="text-muted">Por ahora no hay servicios en oferta. Vuelve pronto.</p>
      ) : (
        <ListaServicios
          servicios={ofertas}
          onSolicitar={(s) => navigate(`/solicitar-cita/${s.id}`)}
          onVerDetalle={(s) => navigate(`/servicios/${s.id}`)}
        />
      )}
    </LayoutPrincipal>
  )
}