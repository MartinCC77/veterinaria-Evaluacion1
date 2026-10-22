import { useNavigate, useParams } from 'react-router-dom'
import LayoutPrincipal from '../components/templates/LayoutPrincipal'
import Boton from '../components/atoms/Boton'
import { useTituloPagina } from '../hooks/useTituloPagina'
import entradas from '../data/entradas.json'

export default function DetalleBlog() {
  const navigate = useNavigate()
  const params = useParams()
  useTituloPagina('Blog')

  const entrada = entradas.find((e) => e.id === Number(params.id))

  if (!entrada) {
    return (
      <LayoutPrincipal>
        <div className="alert alert-danger" role="alert">
          <h1 className="h4">Entrada no encontrada</h1>
          <p className="mb-0">La entrada que buscas no existe.</p>
        </div>
        <Boton onClick={() => navigate('/blog')}>Volver al blog</Boton>
      </LayoutPrincipal>
    )
  }

  return (
    <LayoutPrincipal>
      <article>
        <h1 className="h2 text-primary">{entrada.titulo}</h1>
        <p className="text-muted">{entrada.fecha}</p>
        {/* Cada párrafo del contenido se dibuja con map */}
        {entrada.contenido.map((parrafo, indice) => (
          <p key={indice}>{parrafo}</p>
        ))}
      </article>
      <Boton variante="outline-primary" onClick={() => navigate('/blog')}>
        Volver al blog
      </Boton>
    </LayoutPrincipal>
  )
}