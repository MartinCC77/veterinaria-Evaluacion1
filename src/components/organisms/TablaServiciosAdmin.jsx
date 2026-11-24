import { useState } from 'react'
import Boton from '../atoms/Boton'
import EtiquetaOferta from '../atoms/EtiquetaOferta'
import { formatearPrecio, obtenerPrecioVigente, calcularPorcentajeDescuento } from '../../utils/precios'

export default function TablaServiciosAdmin({ servicios, onEditar, onEliminar }) {
  const [pendiente, setPendiente] = useState(null)

  if (servicios.length === 0) {
    return <p className="text-muted">No hay servicios registrados.</p>
  }

  function confirmar(servicio) {
    onEliminar(servicio)
    setPendiente(null)
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle bg-white">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((s) => (
            <tr key={s.id}>
              <td>{s.codigo}</td>
              <td>{s.nombre}</td>
              <td>{s.categoria}</td>
              <td>
                {formatearPrecio(obtenerPrecioVigente(s))}{' '}
                {s.oferta && <EtiquetaOferta porcentaje={calcularPorcentajeDescuento(s)} />}
              </td>
              <td>
                {pendiente === s.id ? (
                  <span className="d-flex flex-wrap gap-2 align-items-center">
                    <span>¿Eliminar "{s.nombre}"?</span>
                    <Boton variante="danger" onClick={() => confirmar(s)}>
                      Sí, eliminar
                    </Boton>
                    <Boton variante="secondary" onClick={() => setPendiente(null)}>
                      Cancelar
                    </Boton>
                  </span>
                ) : (
                  <span className="d-flex flex-wrap gap-2">
                    <Boton variante="outline-primary" onClick={() => onEditar(s)}>
                      Editar
                    </Boton>
                    <Boton variante="outline-danger" onClick={() => setPendiente(s.id)}>
                      Eliminar
                    </Boton>
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}