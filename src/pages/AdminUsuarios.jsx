import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import TablaUsuariosAdmin from '../components/organisms/TablaUsuariosAdmin'
import Boton from '../components/atoms/Boton'
import { useUsuarios } from '../context/UsuariosContext'
import { useAuth } from '../context/AuthContext'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function AdminUsuarios() {
  const navigate = useNavigate()
  const { usuarios, cargando, recargar, eliminar } = useUsuarios()
  const { usuario } = useAuth()
  const [error, setError] = useState('')
  useTituloPagina('Usuarios (admin)')

  useEffect(() => {
    recargar()
  }, [])

  async function borrar(u) {
    setError('')
    const resultado = await eliminar(u.id)
    if (!resultado.ok) {
      setError(resultado.error)
    }
  }

  return (
    <PlantillaAdmin soloAdministrador>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h2 text-primary mb-0">Usuarios</h1>
        <Boton onClick={() => navigate('/admin/usuarios/nuevo')}>Nuevo usuario</Boton>
      </div>
      {error !== '' && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {cargando ? (
        <p role="status">Cargando usuarios...</p>
      ) : (
        <TablaUsuariosAdmin
          usuarios={usuarios}
          usuarioActualId={usuario?.id}
          onEditar={(u) => navigate(`/admin/usuarios/${u.id}/editar`)}
          onHistorial={(u) => navigate(`/admin/usuarios/${u.id}/historial`)}
          onEliminar={borrar}
        />
      )}
    </PlantillaAdmin>
  )
}