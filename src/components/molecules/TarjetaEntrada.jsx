import Boton from '../atoms/Boton'

export default function TarjetaEntrada({ entrada, onLeer }) {
  return (
    <article className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <h3 className="h5 card-title">{entrada.titulo}</h3>
        <p className="text-muted small">{entrada.fecha}</p>
        <p className="card-text flex-grow-1">{entrada.resumen}</p>
        <Boton variante="outline-primary" onClick={() => onLeer(entrada)}>
          Leer entrada
        </Boton>
      </div>
    </article>
  )
}