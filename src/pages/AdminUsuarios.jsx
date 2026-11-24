import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import TablaUsuariosAdmin from '../components/organisms/TablaUsuariosAdmin'
import Boton from '../components/atoms/Boton'
import { useUsuarios } from '../context/UsuariosContext'
import { useAuth } from '../context/AuthContext'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function AdminUsuarios() {
  const navigate = useNavigate()
  const { usuarios, recargar, eliminar } = useUsuarios()
  const { usuario } = useAuth()
  useTituloPagina('Usuarios (admin)')

  useEffect(() => {
    recargar()
  }, [])

  return (
    <PlantillaAdmin soloAdministrador>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h2 text-primary mb-0">Usuarios</h1>
        <Boton onClick={() => navigate('/admin/usuarios/nuevo')}>Nuevo usuario</Boton>
      </div>
      <TablaUsuariosAdmin
        usuarios={usuarios}
        usuarioActualId={usuario?.id}
        onEditar={(u) => navigate(`/admin/usuarios/${u.id}/editar`)}
        onHistorial={(u) => navigate(`/admin/usuarios/${u.id}/historial`)}
        onEliminar={(u) => eliminar(u.id)}
      />
    </PlantillaAdmin>
  )
}