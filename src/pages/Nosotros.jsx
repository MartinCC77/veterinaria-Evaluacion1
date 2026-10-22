import LayoutPrincipal from '../components/templates/LayoutPrincipal'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function Nosotros() {
  useTituloPagina('Nosotros')

  return (
    <LayoutPrincipal>
      <h1 className="h2 text-primary mb-3">Nosotros</h1>
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <h2 className="h4">Quiénes somos</h2>
          <p>
            Veterinaria San Marcos es una clínica veterinaria de Rancagua. Atendemos a perros, gatos y otras mascotas
            con consultas, vacunación, cirugía menor y desparasitación.
          </p>
        </div>
        <div className="col-12 col-md-6">
          <h2 className="h4">Nuestro compromiso</h2>
          <p>
            Queremos que reservar una hora sea simple: eliges el servicio, la fecha y la hora, y la recepción confirma
            tu cita o te propone otro horario.
          </p>
        </div>
        <div className="col-12">
          <h2 className="h4">Cómo trabajamos</h2>
          <ul>
            <li>Atención de lunes a sábado.</li>
            <li>Consulta de urgencia fuera de horario, con un recargo de $10.000.</li>
            <li>Solicitud de cita en línea, con seguimiento del estado.</li>
          </ul>
        </div>
      </div>
    </LayoutPrincipal>
  )
}