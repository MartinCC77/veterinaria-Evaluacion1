import { useNavigate } from 'react-router-dom'
import LayoutPrincipal from '../components/templates/LayoutPrincipal'
import ListaEntradas from '../components/organisms/ListaEntradas'
import { useTituloPagina } from '../hooks/useTituloPagina'
import entradas from '../data/entradas.json'

export default function Blog() {
  const navigate = useNavigate()
  useTituloPagina('Blog')

  return (
    <LayoutPrincipal>
      <h1 className="h2 text-primary mb-3">Blog</h1>
      <ListaEntradas entradas={entradas} onLeer={(e) => navigate(`/blog/${e.id}`)} />
    </LayoutPrincipal>
  )
}