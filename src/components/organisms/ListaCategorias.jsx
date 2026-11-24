import TarjetaCategoria from '../molecules/TarjetaCategoria'

export default function ListaCategorias({ categorias, onVer }) {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
      {categorias.map((c) => (
        <div className="col" key={c.nombre}>
          <TarjetaCategoria nombre={c.nombre} cantidad={c.cantidad} onVer={onVer} />
        </div>
      ))}
    </div>
  )
}