import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import TablaServiciosAdmin from '../components/organisms/TablaServiciosAdmin'
import Boton from '../components/atoms/Boton'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function AdminServicios() {
  const navigate = useNavigate()
  const { servicios, eliminar } = useServicios()
  const [error, setError] = useState('')
  useTituloPagina('Servicios (admin)')

  // Un servicio con citas asociadas no se puede eliminar: la API responde 409
  async function borrar(servicio) {
    setError('')
    const resultado = await eliminar(servicio.id)
    if (!resultado.ok) {
      setError(resultado.error)
    }
  }

  return (
    <PlantillaAdmin soloAdministrador>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h2 text-primary mb-0">Servicios</h1>
        <Boton onClick={() => navigate('/admin/servicios/nuevo')}>Nuevo servicio</Boton>
      </div>
      {error !== '' && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <TablaServiciosAdmin
        servicios={servicios}
        onEditar={(s) => navigate(`/admin/servicios/${s.id}/editar`)}
        onEliminar={borrar}
      />
    </PlantillaAdmin>
  )
}