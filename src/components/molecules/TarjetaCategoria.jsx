import Boton from '../atoms/Boton'

export default function TarjetaCategoria({ nombre, cantidad, onVer }) {
  return (
    <article className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <h3 className="h5 card-title">{nombre}</h3>
        {/* Singular o plural según la cantidad */}
        <p className="text-muted flex-grow-1">
          {cantidad} {cantidad === 1 ? 'servicio' : 'servicios'}
        </p>
        <Boton onClick={() => onVer(nombre)}>Ver servicios</Boton>
      </div>
    </article>
  )
}