import CampoTexto from '../atoms/CampoTexto'
import Selector from '../atoms/Selector'

export default function BuscadorServicios({ texto, onCambioTexto, categoria, onCambioCategoria, categorias }) {
  const opciones = categorias.map((c) => ({ valor: c, etiqueta: c }))

  return (
    <div className="row g-2 mb-4">
      <div className="col-12 col-md-8">
        <CampoTexto id="buscar" valor={texto} onCambio={onCambioTexto} placeholder="Buscar servicio por nombre" />
      </div>
      <div className="col-12 col-md-4">
        <Selector id="categoria" valor={categoria} onCambio={onCambioCategoria} opciones={opciones} placeholder="Todas las categorías" />
      </div>
    </div>
  )
}