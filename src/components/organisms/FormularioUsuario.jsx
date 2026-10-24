import { useState } from 'react'
import CampoFormulario from '../molecules/CampoFormulario'
import Boton from '../atoms/Boton'
import { validarNombreDueno, validarCorreo, validarClave, validarSeleccion } from '../../utils/validaciones'

const ROLES = [
  { valor: 'administrador', etiqueta: 'Administrador' },
  { valor: 'recepcionista', etiqueta: 'Recepcionista' },
  { valor: 'dueno', etiqueta: 'Dueño de mascota' },
]

export default function FormularioUsuario({ usuario = null, onEnviar, errorGeneral = '' }) {
  const editando = usuario !== null
  const [valores, setValores] = useState({
    nombre: usuario?.nombre ?? '',
    correo: usuario?.correo ?? '',
    clave: '',
    rol: usuario?.rol ?? '',
  })
  const [errores, setErrores] = useState({})

  const cambiar = (campo) => (nuevoValor) => setValores({ ...valores, [campo]: nuevoValor })

  function manejarEnvio(evento) {
    evento.preventDefault()
    const nuevosErrores = {
      nombre: validarNombreDueno(valores.nombre),
      correo: validarCorreo(valores.correo),
      clave: editando && valores.clave === '' ? '' : validarClave(valores.clave),
      rol: validarSeleccion(valores.rol, 'un rol'),
    }
    setErrores(nuevosErrores)

    if (Object.values(nuevosErrores).some((m) => m !== '')) {
      return
    }

    const datos = { nombre: valores.nombre.trim(), correo: valores.correo.trim(), rol: valores.rol }
    if (valores.clave !== '') {
      datos.clave = valores.clave
    }
    onEnviar(datos)
  }

  return (
    <form onSubmit={manejarEnvio} noValidate className="card card-body shadow-sm">
      {errorGeneral !== '' && (
        <div className="alert alert-danger" role="alert">
          {errorGeneral}
        </div>
      )}
      <CampoFormulario id="usr-nombre" etiqueta="Nombre completo" valor={valores.nombre} onCambio={cambiar('nombre')} error={errores.nombre} />
      <CampoFormulario id="usr-correo" etiqueta="Correo electrónico" tipo="email" valor={valores.correo} onCambio={cambiar('correo')} error={errores.correo} />
      <CampoFormulario
        id="usr-clave"
        etiqueta={editando ? 'Nueva clave (opcional)' : 'Clave'}
        tipo="password"
        valor={valores.clave}
        onCambio={cambiar('clave')}
        error={errores.clave}
      />
      <CampoFormulario id="usr-rol" etiqueta="Rol" tipo="select" valor={valores.rol} onCambio={cambiar('rol')} error={errores.rol} opciones={ROLES} />
      <Boton tipo="submit" bloque>
        {editando ? 'Guardar cambios' : 'Crear usuario'}
      </Boton>
    </form>
  )
}