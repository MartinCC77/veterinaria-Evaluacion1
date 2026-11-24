import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import TarjetaResumen from '../components/molecules/TarjetaResumen'
import TablaReporteServicios from '../components/organisms/TablaReporteServicios'
import { useCitas } from '../context/CitasContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { contarCitasPorEstado, resumirCitasPorServicio, calcularIngresos } from '../utils/reportes'
import { formatearPrecio } from '../utils/precios'

export default function AdminReportes() {
  const { citas } = useCitas()
  useTituloPagina('Reportes')

  const porEstado = contarCitasPorEstado(citas)

  return (
    <PlantillaAdmin>
      <h1 className="h2 text-primary mb-3">Reportes</h1>

      <h2 className="h5">Solicitudes por estado</h2>
      <div className="row row-cols-2 row-cols-xl-5 g-3 mb-4">
        <div className="col">
          <TarjetaResumen titulo="Pendientes" valor={porEstado.pendiente} />
        </div>
        <div className="col">
          <TarjetaResumen titulo="Confirmadas" valor={porEstado.confirmada} />
        </div>
        <div className="col">
          <TarjetaResumen titulo="Con nuevo horario" valor={porEstado.reagendada} />
        </div>
        <div className="col">
          <TarjetaResumen titulo="Canceladas" valor={porEstado.cancelada} />
        </div>
        <div className="col">
          <TarjetaResumen titulo="Ingresos confirmados" valor={formatearPrecio(calcularIngresos(citas))} />
        </div>
      </div>

      <h2 className="h5">Por servicio</h2>
      <TablaReporteServicios filas={resumirCitasPorServicio(citas)} />
    </PlantillaAdmin>
  )
}