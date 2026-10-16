import CampoFormulario from './CampoFormulario'


const HORARIOS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30']

export default function SelectorFechaHora({ fecha, hora, onCambioFecha, onCambioHora, errorFecha = '', errorHora = '', fechaMinima }) {

  const opciones = HORARIOS.map((h) => ({ valor: h, etiqueta: h }))

  return (
    <div className="row">
      <div className="col-md-6">
        <CampoFormulario id="fecha" etiqueta="Fecha" tipo="date" valor={fecha} onCambio={onCambioFecha} error={errorFecha} minimo={fechaMinima} />
      </div>
      <div className="col-md-6">
        <CampoFormulario id="hora" etiqueta="Hora" tipo="select" valor={hora} onCambio={onCambioHora} error={errorHora} opciones={opciones} />
      </div>
    </div>
  )
}