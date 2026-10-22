import { useState } from 'react'
import LayoutPrincipal from '../components/templates/LayoutPrincipal'
import FormularioContacto from '../components/organisms/FormularioContacto'
import Icono from '../components/atoms/Icono'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function Contacto() {
  const [enviado, setEnviado] = useState(false)
  useTituloPagina('Contacto')

  function recibirMensaje() {
    setEnviado(true)
  }

  return (
    <LayoutPrincipal>
      <h1 className="h2 text-primary mb-3">Contacto</h1>
      <div className="row g-4">
        <div className="col-12 col-md-5">
          <p>
            <Icono nombre="ubicacion" /> Rancagua, Región de O'Higgins
          </p>
          <p>
            <Icono nombre="telefono" /> +56 9 xxxx xxxx
          </p>
          <p>
            <Icono nombre="reloj" /> Lunes a sábado
          </p>
        </div>
        <div className="col-12 col-md-7">
          {enviado && (
            <div className="alert alert-success" role="status">
              ¡Gracias! Recibimos tu mensaje y te responderemos pronto.
            </div>
          )}
          <FormularioContacto onEnviar={recibirMensaje} />
        </div>
      </div>
    </LayoutPrincipal>
  )
}