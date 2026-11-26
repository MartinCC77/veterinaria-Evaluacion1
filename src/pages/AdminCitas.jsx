import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import TablaCitasAdmin from '../components/organisms/TablaCitasAdmin'
import CampoFormulario from '../components/molecules/CampoFormulario'
import { useCitas } from '../context/CitasContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { filtrarCitasPorEstado } from '../utils/filtros'

const ESTADOS = [
  { valor: 'pendiente', etiqueta: 'Pendientes' },
  { valor: 'confirmada', etiqueta: 'Confirmadas' },
  { valor: 'reagendada', etiqueta: 'Con nuevo horario' },
  { valor: 'cancelada', etiqueta: 'Canceladas' },
]

export default function AdminCitas() {
  const navigate = useNavigate()
  const { citas, cargando, confirmar, reagendar, cancelar } = useCitas()
  const [estado, setEstado] = useState('')
  const [error, setError] = useState('')
  useTituloPagina('Solicitudes de cita')

  const visibles = filtrarCitasPorEstado(citas, estado)

  // Ejecuta la acción y, si la API la rechaza (por ejemplo, horario ocupado), muestra el motivo
  async function ejecutar(accion) {
    setError('')
    const resultado = await accion()
    if (!resultado.ok) {
      setError(resultado.error)
    }
  }

  return (
    <PlantillaAdmin>
      <h1 className="h2 text-primary mb-3">Solicitudes de cita</h1>
      {error !== '' && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="col-12 col-md-4">
        <CampoFormulario id="filtro-estado" etiqueta="Filtrar por estado" tipo="select" valor={estado} onCambio={setEstado} opciones={ESTADOS} />
      </div>
      {cargando ? (
        <p role="status">Cargando citas...</p>
      ) : (
        <TablaCitasAdmin
          citas={visibles}
          onConfirmar={(c) => ejecutar(() => confirmar(c.id))}
          onReagendar={(c, horario) => ejecutar(() => reagendar(c.id, horario))}
          onCancelar={(c) => ejecutar(() => cancelar(c.id))}
          onVerComprobante={(c) => navigate(`/admin/citas/${c.id}`)}
        />
      )}
    </PlantillaAdmin>
  )
}