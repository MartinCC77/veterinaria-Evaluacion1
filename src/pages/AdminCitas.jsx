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
  const { citas, actualizar } = useCitas()
  const [estado, setEstado] = useState('')
  useTituloPagina('Solicitudes de cita')

  const visibles = filtrarCitasPorEstado(citas, estado)

  return (
    <PlantillaAdmin>
      <h1 className="h2 text-primary mb-3">Solicitudes de cita</h1>
      <div className="col-12 col-md-4">
        <CampoFormulario id="filtro-estado" etiqueta="Filtrar por estado" tipo="select" valor={estado} onCambio={setEstado} opciones={ESTADOS} />
      </div>
      <TablaCitasAdmin
        citas={visibles}
        onConfirmar={(c) => actualizar(c.id, { estado: 'confirmada' })}
        // Proponer otro horario: guarda la fecha y hora nuevas y deja la cita en "reagendada".
        onReagendar={(c, horario) => actualizar(c.id, { ...horario, estado: 'reagendada' })}
        onCancelar={(c) => actualizar(c.id, { estado: 'cancelada' })}
        onVerComprobante={(c) => navigate(`/admin/citas/${c.id}`)}
      />
    </PlantillaAdmin>
  )
}