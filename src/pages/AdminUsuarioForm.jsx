import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import FormularioUsuario from '../components/organisms/FormularioUsuario'
import Boton from '../components/atoms/Boton'
import { useUsuarios } from '../context/UsuariosContext'
import { useAuth } from '../context/AuthContext'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function AdminUsuarioForm() {
  const navigate = useNavigate()
  const params = useParams()
  const { usuarios, crear, actualizar } = useUsuarios()
  const { usuario: sesion } = useAuth()
  const [errorGeneral, setErrorGeneral] = useState('')
  useTituloPagina('Formulario de usuario')

  const editando = params.id !== undefined
  const usuario = editando ? usuarios.find((u) => u.id === Number(params.id)) : null

  if (editando && !usuario) {
    return (
      <PlantillaAdmin soloAdministrador>
        <div className="alert alert-danger" role="alert">
          Usuario no encontrado.
        </div>
        <Boton onClick={() => navigate('/admin/usuarios')}>Volver a usuarios</Boton>
      </PlantillaAdmin>
    )
  }

  if (editando && usuario.id === sesion?.id) {
    return (
      <PlantillaAdmin soloAdministrador>
        <div className="alert alert-info" role="status">
          Tu propia cuenta se edita desde tu perfil.
        </div>
        <Boton onClick={() => navigate('/admin/perfil')}>Ir a mi perfil</Boton>
      </PlantillaAdmin>
    )
  }

  function guardar(datos) {
    const resultado = editando ? actualizar(usuario.id, datos) : crear(datos)
    if (!resultado.ok) {
      setErrorGeneral(resultado.error) 
      return
    }
    navigate('/admin/usuarios')
  }

  return (
    <PlantillaAdmin soloAdministrador>
      <h1 className="h2 text-primary mb-3">{editando ? 'Editar usuario' : 'Nuevo usuario'}</h1>
      <FormularioUsuario usuario={usuario} onEnviar={guardar} errorGeneral={errorGeneral} />
    </PlantillaAdmin>
  )
}