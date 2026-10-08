import TarjetaServicio from '../molecules/TarjetaServicio'
import servicios from '../../data/servicios'

export default function ListaServicios() {
  return (
    <section id="servicios" className="mb-4">
      <h2 className="text-vet mb-3">Nuestros servicios medicos</h2>
      <div className="row g-4">
        {servicios.map((s) => (
          <div key={s.id} className="col-12 col-md-6 col-lg-4">
            <TarjetaServicio {...s} />
          </div>
        ))}
      </div>
    </section>
  )
}