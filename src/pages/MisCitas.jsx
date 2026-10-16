import LayoutPrincipal from '../components/templates/LayoutPrincipal'
import TablaCitas from '../components/organisms/TablaCitas'
import { useCitas } from '../context/CitasContext'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function MisCitas() {
  const { citas } = useCitas()
  useTituloPagina('Mis citas')

  return (
    <LayoutPrincipal>
      <h1 className="h2 text-primary mb-3">Mis citas</h1>
      <TablaCitas citas={citas} />
    </LayoutPrincipal>
  )
}