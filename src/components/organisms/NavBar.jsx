import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className="nav justify-content-center mt-3">
      <Link to="/" className="nav-link text-white fw-bold">Inicio</Link>
      <Link to="/servicios" className="nav-link text-white fw-bold">Servicios</Link>
      <Link to="/citas" className="nav-link text-white fw-bold">Solicitar citas</Link>
    </nav>
  )
}