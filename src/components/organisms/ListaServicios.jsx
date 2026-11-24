import TarjetaServicio from '../molecules/TarjetaServicio'

export default function ListaServicios({ servicios, onSolicitar, onVerDetalle }) {
 
  if (servicios.length === 0) {
    return <p className="text-muted">No hay servicios que coincidan con tu búsqueda.</p>
  }

  return (
   
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {servicios.map((s) => (
        <div className="col" key={s.id}>
          <TarjetaServicio servicio={s} onSolicitar={onSolicitar} onVerDetalle={onVerDetalle} />
        </div>
      ))}
    </div>
  )
}