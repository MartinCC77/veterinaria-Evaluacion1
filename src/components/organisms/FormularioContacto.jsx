import { useState } from 'react'
import CampoFormulario from '../molecules/CampoFormulario'
import Boton from '../atoms/Boton'
import { validarNombreDueno, validarCorreo, validarMensaje } from '../../utils/validaciones'

export default function FormularioContacto({ onEnviar }) {
  const [valores, setValores] = useState({ nombre: '', correo: '', mensaje: '' })
  const [errores, setErrores] = useState({})

  const cambiar = (campo) => (nuevoValor) => setValores({ ...valores, [campo]: nuevoValor })

  function manejarEnvio(evento) {
    evento.preventDefault() 
    const nuevosErrores = {
      nombre: validarNombreDueno(valores.nombre),
      correo: validarCorreo(valores.correo),
      mensaje: validarMensaje(valores.mensaje),
    }
    setErrores(nuevosErrores)

    if (Object.values(nuevosErrores).some((m) => m !== '')) {
      return 
    }

    onEnviar({ nombre: valores.nombre.trim(), correo: valores.correo.trim(), mensaje: valores.mensaje.trim() })
    
    setValores({ nombre: '', correo: '', mensaje: '' })
  }

  return (
    <form onSubmit={manejarEnvio} noValidate className="card card-body shadow-sm">
      <CampoFormulario id="contacto-nombre" etiqueta="Nombre" valor={valores.nombre} onCambio={cambiar('nombre')} error={errores.nombre} />
      <CampoFormulario id="contacto-correo" etiqueta="Correo electrónico" tipo="email" valor={valores.correo} onCambio={cambiar('correo')} error={errores.correo} />
      <CampoFormulario id="contacto-mensaje" etiqueta="Mensaje" tipo="textarea" valor={valores.mensaje} onCambio={cambiar('mensaje')} error={errores.mensaje} placeholder="¿En qué podemos ayudarte?" />
      <Boton tipo="submit" bloque>
        Enviar mensaje
      </Boton>
    </form>
  )
}