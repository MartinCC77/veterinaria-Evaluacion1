import { useState } from 'react'
import CampoFormulario from '../molecules/CampoFormulario'
import Boton from '../atoms/Boton'
import { validarObligatorio } from '../../utils/validaciones'

export default function FormularioCategoria({
  onEnviar,
  onCancelar,
  errorGeneral = '',
  textoBoton = 'Agregar',
  valorInicial = '',
  id = 'categoria-nombre', 
  etiqueta = 'Nombre de la categoría',
}) {
  const [nombre, setNombre] = useState(valorInicial)
  const [error, setError] = useState('')

  function manejarEnvio(evento) {
    evento.preventDefault()
    const mensaje = validarObligatorio(nombre, 'El nombre')
    setError(mensaje)
    if (mensaje !== '') {
      return
    }
    onEnviar(nombre.trim())
  }

  return (
    <form onSubmit={manejarEnvio} noValidate>
      {errorGeneral !== '' && (
        <div className="alert alert-danger" role="alert">
          {errorGeneral}
        </div>
      )}
      <CampoFormulario id={id} etiqueta={etiqueta} valor={nombre} onCambio={setNombre} error={error} />
      <div className="d-flex gap-2">
        <Boton tipo="submit">{textoBoton}</Boton>
        {onCancelar && (
          <Boton variante="secondary" onClick={onCancelar}>
            Cancelar
          </Boton>
        )}
      </div>
    </form>
  )
}