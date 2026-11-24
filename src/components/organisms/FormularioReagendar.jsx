import { useState } from 'react'
import SelectorFechaHora from '../molecules/SelectorFechaHora'
import Boton from '../atoms/Boton'
import { validarFecha, validarSeleccion } from '../../utils/validaciones'
import { fechaHoy } from '../../utils/filtros'

export default function FormularioReagendar({ onEnviar, onCancelar, hoy = fechaHoy() }) {
  const [valores, setValores] = useState({ fecha: '', hora: '' })
  const [errores, setErrores] = useState({})

  function manejarEnvio(evento) {
    evento.preventDefault()
    const nuevosErrores = {
      fecha: validarFecha(valores.fecha, hoy),
      hora: validarSeleccion(valores.hora, 'una hora'),
    }
    setErrores(nuevosErrores)

    if (Object.values(nuevosErrores).some((m) => m !== '')) {
      return
    }
    onEnviar({ fecha: valores.fecha, hora: valores.hora })
  }

  return (
    <form onSubmit={manejarEnvio} noValidate>
      <SelectorFechaHora
        fecha={valores.fecha}
        hora={valores.hora}
        onCambioFecha={(fecha) => setValores({ ...valores, fecha })}
        onCambioHora={(hora) => setValores({ ...valores, hora })}
        errorFecha={errores.fecha}
        errorHora={errores.hora}
        fechaMinima={hoy}
      />
      <div className="d-flex gap-2">
        <Boton tipo="submit">Proponer horario</Boton>
        <Boton variante="secondary" onClick={onCancelar}>
          Cancelar
        </Boton>
      </div>
    </form>
  )
}