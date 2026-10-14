import TarjetaServicio from '../molecules/TarjetaServicio'
import servicios from '../../data/servicios'

export default function ListaServicios() {
  return (
    <section id="servicios">
      <h2>Nuestros servicios medicos</h2>
      <div className="grilla-servicios">
        {servicios.map((s) => (
          <TarjetaServicio key={s.id} {...s} />
        ))}
      </div>
    </section>
  )
}