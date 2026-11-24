import { useNavigate, useLocation } from 'react-router-dom'
import NavBar from '../organisms/NavBar'
import Footer from '../organisms/Footer'

const ENLACES_BASE = [
  { ruta: '/', texto: 'Inicio' },
  { ruta: '/servicios', texto: 'Servicios' },
  { ruta: '/solicitar-cita', texto: 'Solicitar cita' },
  { ruta: '/mis-citas', texto: 'Mis citas' },
]

export default function LayoutPrincipal({ children }) {

  const navigate = useNavigate()
  const ubicacion = useLocation()

  // Se vuelve a leer en cada cambio de ruta, así el menú se actualiza solo
  const haySesion = !!localStorage.getItem('token')

  const enlaces = haySesion
    ? [
        ...ENLACES_BASE,
        { ruta: '/usuarios', texto: 'Usuarios' },
        { ruta: '/logout', texto: 'Cerrar sesión' },
      ]
    : [...ENLACES_BASE, { ruta: '/login', texto: 'Iniciar sesión' }]

  function manejarNavegacion(ruta) {
    if (ruta === '/logout') {
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
      navigate('/login')
      return
    }
    navigate(ruta)
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar enlaces={enlaces} rutaActual={ubicacion.pathname} onNavegar={manejarNavegacion} />
      <main className="container my-4 flex-grow-1">{children}</main>
      <Footer onNavegar={navigate} />
    </div>
  )
}