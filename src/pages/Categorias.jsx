import { useNavigate } from 'react-router-dom'
import LayoutPrincipal from '../components/templates/LayoutPrincipal'
import ListaCategorias from '../components/organisms/ListaCategorias'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { contarPorCategoria } from '../utils/filtros'

export default function Categorias() {
  const navigate = useNavigate()
  const { servicios } = useServicios()
  useTituloPagina('Categorías')

  return (
    <LayoutPrincipal>
      <h1 className="h2 text-primary mb-3">Categorías de servicios</h1>
      <ListaCategorias
        categorias={contarPorCategoria(servicios)}
        onVer={(nombre) => navigate(`/categorias/${encodeURIComponent(nombre)}`)}
      />
    </LayoutPrincipal>
  )
}