import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LayoutPrincipal from '../components/templates/LayoutPrincipal'
import BuscadorServicios from '../components/molecules/BuscadorServicios'
import ListaServicios from '../components/organisms/ListaServicios'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { filtrarServicios, obtenerCategorias } from '../utils/filtros'

export default function Servicios() {
  const navigate = useNavigate()
  const { servicios } = useServicios()

  const [texto, setTexto] = useState('')
  const [categoria, setCategoria] = useState('')
  useTituloPagina('Servicios')

  const visibles = filtrarServicios(servicios, texto, categoria)

  return (
    <LayoutPrincipal>
      <h1 className="h2 text-primary mb-3">Servicios</h1>
      <BuscadorServicios
        texto={texto}
        onCambioTexto={setTexto}
        categoria={categoria}
        onCambioCategoria={setCategoria}
        categorias={obtenerCategorias(servicios)}
      />
      <ListaServicios servicios={visibles} onSolicitar={(s) => navigate(`/solicitar-cita/${s.id}`)} />
    </LayoutPrincipal>
  )
}