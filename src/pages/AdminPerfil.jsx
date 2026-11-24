import { useState } from 'react'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import FormularioPerfil from '../components/organisms/FormularioPerfil'
import { useAuth } from '../context/AuthContext'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function AdminPerfil() {
  const { usuario, actualizarPerfil } = useAuth()
  const [guardado, setGuardado] = useState(false)
  useTituloPagina('Perfil')

  function guardar(cambios) {
    actualizarPerfil(cambios)
    setGuardado(true) 
  }

  return (
    <PlantillaAdmin>
      <h1 className="h2 text-primary mb-3">Perfil</h1>
      {guardado && (
        <div className="alert alert-success" role="status">
          Tus cambios se guardaron.
        </div>
      )}
      {usuario && <FormularioPerfil usuario={usuario} onEnviar={guardar} />}
    </PlantillaAdmin>
  )
}