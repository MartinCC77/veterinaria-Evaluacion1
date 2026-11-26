import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import LayoutPrincipal from './LayoutPrincipal'
import Boton from '../atoms/Boton'
import { useAuth } from '../../context/AuthContext'

// Protege una página.
// - Sin sesión: redirige al login y recuerda a qué ruta quería entrar.
// - Con sesión pero rol no permitido: muestra "acceso restringido".
// - roles = null significa "cualquier usuario con sesión".
export default function RutaProtegida({ roles = null, children }) {
  const { usuario } = useAuth()
  const ubicacion = useLocation()
  const navigate = useNavigate()

  if (usuario === null) {
    return <Navigate to="/login" replace state={{ desde: ubicacion.pathname }} />
  }

  if (roles !== null && !roles.includes(usuario.rol)) {
    return (
      <LayoutPrincipal>
        <div className="alert alert-warning" role="alert">
          <h1 className="h4">Acceso restringido</h1>
          <p className="mb-0">Tu perfil no tiene permiso para ver esta página.</p>
        </div>
        <Boton onClick={() => navigate('/')}>Volver al inicio</Boton>
      </LayoutPrincipal>
    )
  }

  return children
}