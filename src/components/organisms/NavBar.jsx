import { useState } from 'react'

export default function NavBar({ enlaces, rutaActual, onNavegar }) {

  const [abierto, setAbierto] = useState(false)


  function ir(evento, ruta) {
    evento.preventDefault()
    setAbierto(false) 
    onNavegar(ruta)
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
          <ul className="navbar-nav ms-auto">
            {enlaces.map((e) => (
              <li className="nav-item" key={e.ruta}>
                <a
                  className={`nav-link${rutaActual === e.ruta ? ' active fw-bold' : ''}`}
                  href={e.ruta}
                  onClick={(evento) => ir(evento, e.ruta)}
                >
                  {e.texto}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}