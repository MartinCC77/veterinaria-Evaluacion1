import TarjetaEntrada from '../molecules/TarjetaEntrada'

export default function ListaEntradas({ entradas, onLeer }) {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {entradas.map((e) => (
        <div className="col" key={e.id}>
          <TarjetaEntrada entrada={e} onLeer={onLeer} />
        </div>
      ))}
    </div>
  )
}