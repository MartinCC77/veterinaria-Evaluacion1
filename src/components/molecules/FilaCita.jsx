import EtiquetaEstadoCita from '../atoms/EtiquetaEstadoCita'
import EtiquetaEspecie from '../atoms/EtiquetaEspecie'

export default function FilaCita({ cita }) {
  return (
    <tr>
      <td>{cita.fecha}</td>
      <td>{cita.hora}</td>
      <td>{cita.mascota}</td>
      <td>
        <EtiquetaEspecie especie={cita.especie} />
      </td>
      <td>{cita.servicioNombre}</td>
      <td>
        <EtiquetaEstadoCita estado={cita.estado} />
      </td>
    </tr>
  )
}