export default function MenuAdmin({ enlaces, rutaActual, onNavegar }) {
  function ir(evento, ruta) {
    evento.preventDefault() 
    onNavegar(ruta)
  }

  function estaActivo(ruta) {
    return ruta === '/admin' ? rutaActual === ruta : rutaActual.startsWith(ruta)
  }

  return (
    <nav className="list-group" aria-label="Menú del panel">
      {enlaces.map((e) => (
        <a
          key={e.ruta}
          href={e.ruta}
          className={`list-group-item list-group-item-action${estaActivo(e.ruta) ? ' active' : ''}`}
          onClick={(evento) => ir(evento, e.ruta)}
        >
          {e.texto}
        </a>
      ))}
    </nav>
  )
}