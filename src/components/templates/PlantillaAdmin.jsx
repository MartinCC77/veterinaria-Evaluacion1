import { useNavigate, useLocation } from 'react-router-dom'
import LayoutPrincipal from './LayoutPrincipal'
import MenuAdmin from '../organisms/MenuAdmin'
import Boton from '../atoms/Boton'
import { useAuth } from '../../context/AuthContext'
import { esPersonal, esAdministrador } from '../../utils/permisos'

const ENLACES_ADMIN = [
  { ruta: '/admin', texto: 'Dashboard' },
  { ruta: '/admin/citas', texto: 'Solicitudes de cita' },
  { ruta: '/admin/criticos', texto: 'Servicios críticos' },
  { ruta: '/admin/servicios', texto: 'Servicios', soloAdmin: true },
  { ruta: '/admin/categorias', texto: 'Categorías', soloAdmin: true },
  { ruta: '/admin/usuarios', texto: 'Usuarios', soloAdmin: true },
  { ruta: '/admin/reportes', texto: 'Reportes' },
  { ruta: '/admin/perfil', texto: 'Perfil' },
]

export default function PlantillaAdmin({ children, soloAdministrador = false }) {
  const navigate = useNavigate()
  const ubicacion = useLocation()
  const { usuario } = useAuth()

  if (!esPersonal(usuario)) {
    return (
      <LayoutPrincipal>
        <div className="alert alert-warning" role="alert">
          <h1 className="h4">Acceso restringido</h1>
          <p className="mb-0">Esta sección es solo para el personal de la clínica. Inicia sesión con una cuenta autorizada.</p>
        </div>
        <Boton onClick={() => navigate('/login')}>Ingresar</Boton>
      </LayoutPrincipal>
    )
  }


  if (soloAdministrador && !esAdministrador(usuario)) {
    return (
      <LayoutPrincipal>
        <div className="alert alert-warning" role="alert">
          <h1 className="h4">Acceso restringido</h1>
          <p className="mb-0">Esta sección es solo para el administrador.</p>
        </div>
        <Boton onClick={() => navigate('/admin')}>Volver al dashboard</Boton>
      </LayoutPrincipal>
    )
  }

  const enlaces = ENLACES_ADMIN.filter((e) => !e.soloAdmin || esAdministrador(usuario))

  return (
    <LayoutPrincipal>
      <div className="row g-4">
        <aside className="col-12 col-md-3 col-xl-2">
          <MenuAdmin enlaces={enlaces} rutaActual={ubicacion.pathname} onNavegar={navigate} />
        </aside>
        <section className="col-12 col-md-9 col-xl-10">{children}</section>
      </div>
    </LayoutPrincipal>
  )
}