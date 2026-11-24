import { useState } from 'react'
import CampoFormulario from '../molecules/CampoFormulario'
import Boton from '../atoms/Boton'
import { validarObligatorio, validarSeleccion, validarNumeroPositivo, validarPrecioOferta } from '../../utils/validaciones'

const ESPECIES = ['Todas', 'Perro y gato', 'Perro', 'Gato', 'Otras'].map((e) => ({ valor: e, etiqueta: e }))

function valoresIniciales(servicio) {
  return {
    codigo: servicio?.codigo ?? '',
    nombre: servicio?.nombre ?? '',
    categoria: servicio?.categoria ?? '',
    especie: servicio?.especie ?? '',
    duracion: servicio ? String(servicio.duracion) : '',
    precio: servicio ? String(servicio.precio) : '',
    oferta: servicio?.oferta ?? false,
    precioOferta: servicio?.precioOferta ? String(servicio.precioOferta) : '',
    observaciones: servicio?.observaciones ?? '',
    imagen: servicio?.imagen ?? '',
  }
}

export default function FormularioServicio({ servicio = null, categorias, onEnviar }) {
  const [valores, setValores] = useState(() => valoresIniciales(servicio))
  const [errores, setErrores] = useState({})

  const cambiar = (campo) => (nuevoValor) => setValores({ ...valores, [campo]: nuevoValor })

  function manejarEnvio(evento) {
    evento.preventDefault()
    const nuevosErrores = {
      codigo: validarObligatorio(valores.codigo, 'El código'),
      nombre: validarObligatorio(valores.nombre, 'El nombre'),
      categoria: validarSeleccion(valores.categoria, 'una categoría'),
      especie: validarSeleccion(valores.especie, 'la especie'),
      duracion: validarNumeroPositivo(valores.duracion, 'La duración'),
      precio: validarNumeroPositivo(valores.precio, 'El precio'),
      // El precio de oferta solo se valida si la casilla "en oferta" está marcada.
      precioOferta: valores.oferta ? validarPrecioOferta(valores.precioOferta, valores.precio) : '',
      observaciones: validarObligatorio(valores.observaciones, 'La descripción'),
      imagen: validarObligatorio(valores.imagen, 'La imagen'),
    }
    setErrores(nuevosErrores)

    if (Object.values(nuevosErrores).some((m) => m !== '')) {
      return
    }

    onEnviar({
      codigo: valores.codigo.trim(),
      nombre: valores.nombre.trim(),
      categoria: valores.categoria,
      especie: valores.especie,
      duracion: Number(valores.duracion),
      precio: Number(valores.precio),
      oferta: valores.oferta,
      precioOferta: valores.oferta ? Number(valores.precioOferta) : null,
      observaciones: valores.observaciones.trim(),
      imagen: valores.imagen.trim(),
    })
  }

  const opcionesCategoria = categorias.map((c) => ({ valor: c, etiqueta: c }))

  return (
    <form onSubmit={manejarEnvio} noValidate className="card card-body shadow-sm">
      <div className="row">
        <div className="col-md-4">
          <CampoFormulario id="srv-codigo" etiqueta="Código" valor={valores.codigo} onCambio={cambiar('codigo')} error={errores.codigo} placeholder="Ej: CON-003" />
        </div>
        <div className="col-md-8">
          <CampoFormulario id="srv-nombre" etiqueta="Nombre" valor={valores.nombre} onCambio={cambiar('nombre')} error={errores.nombre} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <CampoFormulario id="srv-categoria" etiqueta="Categoría" tipo="select" valor={valores.categoria} onCambio={cambiar('categoria')} error={errores.categoria} opciones={opcionesCategoria} />
        </div>
        <div className="col-md-6">
          <CampoFormulario id="srv-especie" etiqueta="Especie" tipo="select" valor={valores.especie} onCambio={cambiar('especie')} error={errores.especie} opciones={ESPECIES} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <CampoFormulario id="srv-duracion" etiqueta="Duración (minutos)" valor={valores.duracion} onCambio={cambiar('duracion')} error={errores.duracion} />
        </div>
        <div className="col-md-6">
          <CampoFormulario id="srv-precio" etiqueta="Precio" valor={valores.precio} onCambio={cambiar('precio')} error={errores.precio} />
        </div>
      </div>

      <div className="form-check mb-3">
        <input
          id="srv-oferta"
          type="checkbox"
          className="form-check-input"
          checked={valores.oferta}
          onChange={(e) => cambiar('oferta')(e.target.checked)}
        />
        <label htmlFor="srv-oferta" className="form-check-label">
          Servicio en oferta
        </label>
      </div>
      {valores.oferta && (
        <CampoFormulario id="srv-precio-oferta" etiqueta="Precio de oferta" valor={valores.precioOferta} onCambio={cambiar('precioOferta')} error={errores.precioOferta} />
      )}

      <CampoFormulario id="srv-observaciones" etiqueta="Descripción" tipo="textarea" valor={valores.observaciones} onCambio={cambiar('observaciones')} error={errores.observaciones} />
      <CampoFormulario id="srv-imagen" etiqueta="Imagen (ruta)" valor={valores.imagen} onCambio={cambiar('imagen')} error={errores.imagen} placeholder="/Imagenes/ConsultaGeneral.jpg" />

      <Boton tipo="submit" bloque>
        {servicio ? 'Guardar cambios' : 'Crear servicio'}
      </Boton>
    </form>
  )
}