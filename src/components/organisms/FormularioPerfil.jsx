import { useState } from 'react'
import CampoFormulario from '../molecules/CampoFormulario'
import Boton from '../atoms/Boton'
import { validarNombreDueno, validarClave } from '../../utils/validaciones'
import { etiquetaRol } from '../../utils/permisos'

export default function FormularioPerfil({ usuario, onEnviar }) {
  const [valores, setValores] = useState({ nombre: usuario.nombre, clave: '' })
  const [errores, setErrores] = useState({})

  const cambiar = (campo) => (nuevoValor) => setValores({ ...valores, [campo]: nuevoValor })

  function manejarEnvio(evento) {
    evento.preventDefault()
    const nuevosErrores = {
      nombre: validarNombreDueno(valores.nombre),
      clave: valores.clave === '' ? '' : validarClave(valores.clave),
    }
    setErrores(nuevosErrores)

    if (Object.values(nuevosErrores).some((m) => m !== '')) {
      return
    }

    const cambios = { nombre: valores.nombre.trim() }
    if (valores.clave !== '') {
      cambios.clave = valores.clave
    }
    onEnviar(cambios)
    setValores({ ...valores, clave: '' })
  }

  return (
    <form onSubmit={manejarEnvio} noValidate className="card card-body shadow-sm">
      <p className="mb-1">
        <strong>Correo:</strong> {usuario.correo}
      </p>
      <p>
        <strong>Rol:</strong> {etiquetaRol(usuario.rol)}
      </p>
      <CampoFormulario id="perfil-nombre" etiqueta="Nombre" valor={valores.nombre} onCambio={cambiar('nombre')} error={errores.nombre} />
      <CampoFormulario id="perfil-clave" etiqueta="Nueva clave (opcional)" tipo="password" valor={valores.clave} onCambio={cambiar('clave')} error={errores.clave} />
      <Boton tipo="submit" bloque>
        Guardar cambios
      </Boton>
    </form>
  )
}