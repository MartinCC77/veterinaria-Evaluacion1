export default function TarjetaServicio({ imagen, alt, titulo, descripcion }) {
  return (
    <article className="tarjeta-servicio">
      <img src={imagen} alt={alt} />
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
    </article>
  )
}