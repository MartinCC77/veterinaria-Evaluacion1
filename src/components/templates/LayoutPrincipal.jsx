import { useNavigate, useLocation } from 'react-router-dom'
import NavBar from '../organisms/NavBar'
import Footer from '../organisms/Footer'

const ENLACES_BASE = [
  { ruta: '/', texto: 'Inicio' },
  { ruta: '/servicios', texto: 'Servicios' },
  { ruta: '/solicitar-cita', texto: 'Solicitar cita' },
  { ruta: '/mis-citas', texto: 'Mis citas' },
]

function leerUsuario() {
  try {
    const token = localStorage.getItem('token')
    const usuario = JSON.parse(localStorage.getItem('usuario') || 'null')
    return token && usuario ? usuario : null
  } catch {
    return null
  }
}

export default function LayoutPrincipal({ children }) {
  const navigate = useNavigate()
  const ubicacion = useLocation()

  // Se vuelve a leer en cada cambio de ruta
  const usuario = leerUsuario()

  const enlaces = usuario
    ? [...ENLACES_BASE, { ruta: '/usuarios', texto: 'Usuarios' }]
    : ENLACES_BASE

  function salir() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    navigate('/login')
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar
        enlaces={enlaces}
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