import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav>
      <Link to="/">Inicio Y Servicios</Link>
      <Link to="/citas">Solicitar citas</Link>
    </nav>
  )
}