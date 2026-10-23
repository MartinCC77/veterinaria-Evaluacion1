import { useNavigate, useLocation } from 'react-router-dom'
import NavBar from '../organisms/NavBar'
import Footer from '../organisms/Footer'

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

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar enlaces={ENLACES} rutaActual={ubicacion.pathname} onNavegar={navigate} />
      
      <main className="container my-4 flex-grow-1">{children}</main>
      <Footer onNavegar={navigate} />
    </div>
  )
}