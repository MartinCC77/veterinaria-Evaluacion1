import Boton from '../atoms/Boton'

export default function TarjetaResumen({ titulo, valor, detalle = '', onVer, textoBoton = 'Ver' }) {
  return (
    <article className="card h-100 shadow-sm">
      <div className="card-body">
        <h2 className="h6 text-muted">{titulo}</h2>
        <p className="display-6 fw-bold mb-1">{valor}</p>
        <p className="text-muted small mb-3">{detalle}</p>
        {onVer && (
          <Boton variante="outline-primary" onClick={onVer}>
            {textoBoton}
          </Boton>
        )}
      </div>
    </article>
  )
}