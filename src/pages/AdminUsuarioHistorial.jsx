import { useNavigate, useParams } from 'react-router-dom'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import TablaCitas from '../components/organisms/TablaCitas'
import Boton from '../components/atoms/Boton'
import { useUsuarios } from '../context/UsuariosContext'
import { useCitas } from '../context/CitasContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { citasDelUsuario } from '../utils/filtros'

export default function AdminUsuarioHistorial() {
  const navigate = useNavigate()
  const params = useParams()
  const { usuarios } = useUsuarios()
  const { citas } = useCitas()
  useTituloPagina('Historial de solicitudes')

  const usuario = usuarios.find((u) => u.id === Number(params.id))

  return (
    <PlantillaAdmin soloAdministrador>
      {usuario ? (
        <>
          <h1 className="h2 text-primary mb-1">Historial de {usuario.nombre}</h1>
          <p className="text-muted">{usuario.correo}</p>
          <TablaCitas citas={citasDelUsuario(citas, usuario.id)} />
        </>
      ) : (
        <div className="alert alert-danger" role="alert">
          Usuario no encontrado.
        </div>
      )}
      <Boton variante="outline-primary" onClick={() => navigate('/admin/usuarios')}>
        Volver a usuarios
      </Boton>
    </PlantillaAdmin>
  )
}