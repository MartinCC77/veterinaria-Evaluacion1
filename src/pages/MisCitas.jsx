import LayoutPrincipal from '../components/templates/LayoutPrincipal'
import TablaCitas from '../components/organisms/TablaCitas'
import { useCitas } from '../context/CitasContext'
import { useAuth } from '../context/AuthContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { citasDelUsuario } from '../utils/filtros'

export default function MisCitas() {
  const { citas, cargando } = useCitas()
  const { usuario } = useAuth()
  useTituloPagina('Mis citas')

  // El personal recibe todas las citas de la clínica, pero aquí solo debe ver las que pidió él
  const mias = usuario ? citasDelUsuario(citas, usuario.id) : []

  return (
    <LayoutPrincipal>
      <h1 className="h2 text-primary mb-3">Mis citas</h1>
      {cargando ? <p role="status">Cargando tus citas...</p> : <TablaCitas citas={mias} />}
    </LayoutPrincipal>
  )
}