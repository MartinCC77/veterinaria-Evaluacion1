import { useState } from 'react'
import CampoFormulario from '../molecules/CampoFormulario'
import Boton from '../atoms/Boton'
import { validarNombreDueno, validarCorreo, validarClave, validarConfirmacionClave } from '../../utils/validaciones'

export default function FormularioRegistro({ onEnviar, errorGeneral = '' }) {
  const [valores, setValores] = useState({ nombre: '', correo: '', clave: '', confirmacion: '' })
  const [errores, setErrores] = useState({})

  const cambiar = (campo) => (nuevoValor) => setValores({ ...valores, [campo]: nuevoValor })

  function manejarEnvio(evento) {
    evento.preventDefault()
    const nuevosErrores = {
      nombre: validarNombreDueno(valores.nombre),
      correo: validarCorreo(valores.correo),
      clave: validarClave(valores.clave),
      confirmacion: validarConfirmacionClave(valores.clave, valores.confirmacion),
    }
    setErrores(nuevosErrores)

    if (Object.values(nuevosErrores).some((m) => m !== '')) {
      return
    }
    onEnviar({ nombre: valores.nombre.trim(), correo: valores.correo.trim(), clave: valores.clave })
  }

  return (
    <form onSubmit={manejarEnvio} noValidate className="card card-body shadow-sm">
      {errorGeneral !== '' && (
        <div className="alert alert-danger" role="alert">
          {errorGeneral}
        </div>
      )}
      <CampoFormulario id="registro-nombre" etiqueta="Nombre completo" valor={valores.nombre} onCambio={cambiar('nombre')} error={errores.nombre} />
      <CampoFormulario id="registro-correo" etiqueta="Correo electrónico" tipo="email" valor={valores.correo} onCambio={cambiar('correo')} error={errores.correo} />
      <CampoFormulario id="registro-clave" etiqueta="Clave" tipo="password" valor={valores.clave} onCambio={cambiar('clave')} error={errores.clave} />
      <CampoFormulario id="registro-confirmacion" etiqueta="Repite la clave" tipo="password" valor={valores.confirmacion} onCambio={cambiar('confirmacion')} error={errores.confirmacion} />
      <Boton tipo="submit" bloque>
        Crear cuenta
      </Boton>
    </form>
  )
}