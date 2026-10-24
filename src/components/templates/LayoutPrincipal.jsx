// Plantilla: LayoutPrincipal. Arma la estructura común de las páginas: NavBar + contenido + Footer.
// Solo las plantillas y las páginas usan el router (useNavigate / useLocation) y la sesión (useAuth).
import { useNavigate, useLocation } from 'react-router-dom'
import NavBar from '../organisms/NavBar'
import Footer from '../organisms/Footer'
import { useAuth } from '../../context/AuthContext'

const ENLACES = [
  { ruta: '/', texto: 'Inicio' },
  { ruta: '/servicios', texto: 'Servicios' },
  { ruta: '/categorias', texto: 'Categorías' },
  { ruta: '/ofertas', texto: 'Ofertas' },
  { ruta: '/blog', texto: 'Blog' },
  { ruta: '/nosotros', texto: 'Nosotros' },
  { ruta: '/contacto', texto: 'Contacto' },
  { ruta: '/solicitar-cita', texto: 'Solicitar cita' },
  { ruta: '/mis-citas', texto: 'Mis citas' },
]

export default function LayoutPrincipal({ children }) {
  const navigate = useNavigate()
  const ubicacion = useLocation()
  const { usuario, cerrarSesion } = useAuth()

  function salir() {
    cerrarSesion()
    navigate('/')
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar
        enlaces={ENLACES}
        rutaActual={ubicacion.pathname}
        onNavegar={navigate}
        usuario={usuario}
        onCerrarSesion={salir}
      />
      <main className="container my-4 flex-grow-1">{children}</main>
      <Footer onNavegar={navigate} />
    </div>
  )
}