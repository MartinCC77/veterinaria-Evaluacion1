import { useState } from 'react'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import FormularioPerfil from '../components/organisms/FormularioPerfil'
import { useAuth } from '../context/AuthContext'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function AdminPerfil() {
  const { usuario, actualizarPerfil } = useAuth()
  const [guardado, setGuardado] = useState(false)
  const [error, setError] = useState('')
  useTituloPagina('Perfil')

  async function guardar(cambios) {
    setGuardado(false)
    setError('')
    const resultado = await actualizarPerfil(cambios)
    if (resultado.ok) {
      setGuardado(true)
    } else {
      setError(resultado.error)
    }
  }

  return (
    <PlantillaAdmin>
      <h1 className="h2 text-primary mb-3">Perfil</h1>
      {guardado && (
        <div className="alert alert-success" role="status">
          Tus cambios se guardaron.
        </div>
      )}
      {error !== '' && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {usuario && <FormularioPerfil usuario={usuario} onEnviar={guardar} />}
    </PlantillaAdmin>
  )
}