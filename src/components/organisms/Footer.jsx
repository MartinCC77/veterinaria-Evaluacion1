import Icono from '../atoms/Icono'

export default function Footer({ onNavegar }) {
  function irAInicio(evento) {
    evento.preventDefault()
    onNavegar('/')
  }

  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container text-center">
        <p className="mb-1">
          <Icono nombre="ubicacion" /> Rancagua, Región de O'Higgins · Lunes a sábado
        </p>
        <p className="mb-1">
          <Icono nombre="telefono" /> Atención telefónica: +56 9 xxxx xxxx
        </p>
        <p className="mb-0 small">
          © 2026 Veterinaria San Marcos ·{' '}
          <a href="/" className="link-light" onClick={irAInicio}>
            Volver al inicio
          </a>
        </p>
      </div>
    </footer>
  )
}