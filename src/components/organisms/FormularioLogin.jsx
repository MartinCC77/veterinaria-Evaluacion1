import { useState } from 'react'
import CampoFormulario from '../molecules/CampoFormulario'
import Boton from '../atoms/Boton'
import { validarCorreo, validarObligatorio } from '../../utils/validaciones'

export default function FormularioLogin({ onEnviar, errorGeneral = '' }) {
  const [valores, setValores] = useState({ correo: '', clave: '' })
  const [errores, setErrores] = useState({})

  const cambiar = (campo) => (nuevoValor) => setValores({ ...valores, [campo]: nuevoValor })

  function manejarEnvio(evento) {
    evento.preventDefault()
    const nuevosErrores = {
      correo: validarCorreo(valores.correo),
      clave: validarObligatorio(valores.clave, 'La clave'),
    }
    setErrores(nuevosErrores)

    if (Object.values(nuevosErrores).some((m) => m !== '')) {
      return
    }
    onEnviar({ correo: valores.correo.trim(), clave: valores.clave })
  }

  return (
    <form onSubmit={manejarEnvio} noValidate className="card card-body shadow-sm">
      {errorGeneral !== '' && (
        <div className="alert alert-danger" role="alert">
          {errorGeneral}
        </div>
      )}
      <CampoFormulario id="login-correo" etiqueta="Correo electrónico" tipo="email" valor={valores.correo} onCambio={cambiar('correo')} error={errores.correo} />
      <CampoFormulario id="login-clave" etiqueta="Clave" tipo="password" valor={valores.clave} onCambio={cambiar('clave')} error={errores.clave} />
      <Boton tipo="submit" bloque>
        Ingresar
      </Boton>
    </form>
  )
}