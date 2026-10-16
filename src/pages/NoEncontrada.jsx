import { useNavigate } from 'react-router-dom'
import LayoutPrincipal from '../components/templates/LayoutPrincipal'
import Boton from '../components/atoms/Boton'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function NoEncontrada() {
  const navigate = useNavigate()
  useTituloPagina('Página no encontrada')

  return (
    <LayoutPrincipal>
      <h1 className="h2">Página no encontrada</h1>
      <p>La dirección que escribiste no existe.</p>
      <Boton onClick={() => navigate('/')}>Ir al inicio</Boton>
    </LayoutPrincipal>
  )
}