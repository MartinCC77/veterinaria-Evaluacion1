import { useState } from 'react'
import CampoFormulario from '../molecules/CampoFormulario'
import SelectorFechaHora from '../molecules/SelectorFechaHora'
import Boton from '../atoms/Boton'
import {
  validarNombreDueno,
  validarCorreo,
  validarMascota,
  validarSeleccion,
  validarMotivo,
  validarFecha,
} from '../../utils/validaciones'
import { calcularPrecioCita, formatearPrecio } from '../../utils/precios'
import { fechaHoy } from '../../utils/filtros'

const ESPECIES = [
  { valor: 'perro', etiqueta: 'Perro' },
  { valor: 'gato', etiqueta: 'Gato' },
  { valor: 'conejo', etiqueta: 'Conejo' },
  { valor: 'ave', etiqueta: 'Ave / Otra' },
]

export default function FormularioSolicitudCita({ servicios, servicioInicial = '', onEnviar, hoy = fechaHoy() }) {

  const [valores, setValores] = useState({
    dueno: '',
    correo: '',
    mascota: '',
    especie: '',
    servicioId: String(servicioInicial),
    fecha: '',
    hora: '',
    motivo: '',
    urgencia: false,
  })

  const [errores, setErrores] = useState({})


  const cambiar = (campo) => (nuevoValor) => setValores({ ...valores, [campo]: nuevoValor })


  const servicio = servicios.find((s) => String(s.id) === valores.servicioId)
  const admiteUrgencia = servicio?.categoria === 'Consulta'
  const precioFinal = servicio ? calcularPrecioCita(servicio.precio, admiteUrgencia && valores.urgencia) : 0

 
  function validar() {
    return {
      dueno: validarNombreDueno(valores.dueno),
      correo: validarCorreo(valores.correo),
      mascota: validarMascota(valores.mascota),
      especie: validarSeleccion(valores.especie, 'la especie'),
      servicioId: validarSeleccion(valores.servicioId, 'un servicio'),
      fecha: validarFecha(valores.fecha, hoy),
      hora: validarSeleccion(valores.hora, 'una hora'),
      motivo: validarMotivo(valores.motivo),
    }
  }

  function manejarEnvio(evento) {

    evento.preventDefault()
    const nuevosErrores = validar()
    setErrores(nuevosErrores)


    const hayErrores = Object.values(nuevosErrores).some((mensaje) => mensaje !== '')
    if (hayErrores) {
      return 
    }


    onEnviar({
      dueno: valores.dueno.trim(),
      correo: valores.correo.trim(),
      mascota: valores.mascota.trim(),
      especie: valores.especie,
      servicioId: servicio.id,
      servicioNombre: servicio.nombre,
      fecha: valores.fecha,
      hora: valores.hora,
      motivo: valores.motivo.trim(),
      urgencia: admiteUrgencia && valores.urgencia,
      precioFinal,
    })
  }

  const opcionesServicio = servicios.map((s) => ({ valor: String(s.id), etiqueta: s.nombre }))

  return (

    <form onSubmit={manejarEnvio} noValidate className="card card-body shadow-sm">
      <CampoFormulario id="dueno" etiqueta="Nombre del dueño/a" valor={valores.dueno} onCambio={cambiar('dueno')} error={errores.dueno} placeholder="Ej: Juan Pérez" />
      <CampoFormulario id="correo" etiqueta="Correo electrónico" tipo="email" valor={valores.correo} onCambio={cambiar('correo')} error={errores.correo} placeholder="ejemplo@correo.com" />

      <div className="row">
        <div className="col-md-6">
          <CampoFormulario id="mascota" etiqueta="Nombre de la mascota" valor={valores.mascota} onCambio={cambiar('mascota')} error={errores.mascota} placeholder="Ej: Cachulo" />
        </div>
        <div className="col-md-6">
          <CampoFormulario id="especie" etiqueta="Especie" tipo="select" valor={valores.especie} onCambio={cambiar('especie')} error={errores.especie} opciones={ESPECIES} />
        </div>
      </div>

      <CampoFormulario id="servicioId" etiqueta="Servicio" tipo="select" valor={valores.servicioId} onCambio={cambiar('servicioId')} error={errores.servicioId} opciones={opcionesServicio} />

      <SelectorFechaHora
        fecha={valores.fecha}
        hora={valores.hora}
        onCambioFecha={cambiar('fecha')}
        onCambioHora={cambiar('hora')}
        errorFecha={errores.fecha}
        errorHora={errores.hora}
        fechaMinima={hoy}
      />

      <CampoFormulario id="motivo" etiqueta="Motivo de la consulta" tipo="textarea" valor={valores.motivo} onCambio={cambiar('motivo')} error={errores.motivo} placeholder="Describa brevemente el motivo de la atención" />

      {}
      {admiteUrgencia && (
        <div className="form-check mb-3">
          <input
            id="urgencia"
            type="checkbox"
            className="form-check-input"
            checked={valores.urgencia}
            onChange={(e) => cambiar('urgencia')(e.target.checked)}
          />
          <label htmlFor="urgencia" className="form-check-label">
            Es una urgencia fuera de horario (suma $10.000)
          </label>
        </div>
      )}

      {servicio && (
        <p className="fw-bold" data-testid="precio-final">
          Precio estimado: {formatearPrecio(precioFinal)}
        </p>
      )}

      <Boton tipo="submit" bloque>
        Reservar cita
      </Boton>
    </form>
  )
}