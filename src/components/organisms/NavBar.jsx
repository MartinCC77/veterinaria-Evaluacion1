import { useState } from 'react'
import Boton from '../atoms/Boton'

export default function NavBar({ enlaces, rutaActual, onNavegar, usuario = null, onCerrarSesion = () => {} }) {
  // abierto = el menú está desplegado (solo se nota en pantallas pequeñas)
  const [abierto, setAbierto] = useState(false)

  function ir(evento, ruta) {
    evento.preventDefault()
    setAbierto(false)
    onNavegar(ruta)
  }

  function enlace(ruta, texto) {
    return (
      <li className="nav-item" key={ruta}>
        <a
          className={`nav-link${rutaActual === ruta ? ' active fw-bold' : ''}`}
          href={ruta}
          onClick={(evento) => ir(evento, ruta)}
        >
          {texto}
        </a>
      </li>
    )
  }

  return (
    <nav className="navbar navbar-expand-xl navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/" onClick={(e) => ir(e, '/')}>
          Veterinaria San Marcos
        </a>

        <button
          className="navbar-toggler"
          type="button"
          aria-label="Abrir menú"
          aria-expanded={abierto}
          onClick={() => setAbierto(!abierto)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse${abierto ? ' show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-xl-center">
            {enlaces.map((e) => enlace(e.ruta, e.texto))}

            {usuario ? (
              <li className="nav-item d-flex align-items-center gap-2 ms-xl-3">
                <span className="navbar-text text-white">Hola, {usuario.nombre}</span>
                <Boton variante="outline-light" onClick={onCerrarSesion}>
                  Salir
                </Boton>
              </li>
            ) : (
              <>
                {enlace('/login', 'Ingresar')}
                {enlace('/registro', 'Registrarse')}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}