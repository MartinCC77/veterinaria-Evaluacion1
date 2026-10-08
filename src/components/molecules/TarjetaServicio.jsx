export default function TarjetaServicio({ imagen, alt, titulo, descripcion }) {
  return (
    <article className="card h-100 shadow-sm text-center p-3">
      <img
        src={imagen}
        alt={alt}
        className="card-img-top rounded mb-2"
        style={{ height: '180px', objectFit: 'cover' }}
      />
      <div className="card-body p-0">
        <h3 className="h5 card-title">{titulo}</h3>
        <p className="card-text">{descripcion}</p>
      </div>
    </article>
  )
}