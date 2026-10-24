import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import TablaCriticos from '../components/organisms/TablaCriticos'
import { useServicios } from '../context/ServiciosContext'
import { useCitas } from '../context/CitasContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { contarPendientesPorServicio, UMBRAL_CRITICO } from '../utils/reportes'

export default function AdminCriticos() {
  const { servicios } = useServicios()
  const { citas } = useCitas()
  useTituloPagina('Servicios críticos')

  return (
    <PlantillaAdmin>
      <h1 className="h2 text-primary mb-2">Servicios críticos</h1>
      <p className="text-muted">
        Un servicio es crítico cuando acumula {UMBRAL_CRITICO} o más solicitudes pendientes: conviene atenderlas primero.
      </p>
      <TablaCriticos filas={contarPendientesPorServicio(servicios, citas)} />
    </PlantillaAdmin>
  )
}