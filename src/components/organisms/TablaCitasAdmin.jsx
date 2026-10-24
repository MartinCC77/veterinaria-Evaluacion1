import { Fragment, useState } from 'react'
import Boton from '../atoms/Boton'
import EtiquetaEstadoCita from '../atoms/EtiquetaEstadoCita'
import FormularioReagendar from './FormularioReagendar'

export default function TablaCitasAdmin({ citas, onConfirmar, onReagendar, onCancelar, onVerComprobante, hoy }) {
  // accion recuerda qué cita tiene un panel abierto: { id, tipo: 'reagendar' | 'cancelar' } (o null).
  const [accion, setAccion] = useState(null)

  if (citas.length === 0) {
    return <p className="text-muted">No hay solicitudes para mostrar.</p>
  }

  function reagendar(cita, nuevoHorario) {
    onReagendar(cita, nuevoHorario)
    setAccion(null)
  }

  function cancelar(cita) {
    onCancelar(cita)
    setAccion(null)
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle bg-white">
        <thead>
          <tr>
            <th>N°</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Dueño</th>
            <th>Mascota</th>
            <th>Servicio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((c) => {
            const abierta = c.estado === 'pendiente' || c.estado === 'reagendada'
            const activa = c.estado !== 'cancelada'
            return (
              <Fragment key={c.id}>
                <tr>
                  <td>{c.id}</td>
                  <td>{c.fecha}</td>
                  <td>{c.hora}</td>
                  <td>{c.dueno}</td>
                  <td>{c.mascota}</td>
                  <td>{c.servicioNombre}</td>
                  <td>
                    <EtiquetaEstadoCita estado={c.estado} />
                  </td>
                  <td>
                    <span className="d-flex flex-wrap gap-2">
                      {abierta && (
                        <Boton variante="success" onClick={() => onConfirmar(c)}>
                          Confirmar
                        </Boton>
                      )}
                      {abierta && (
                        <Boton variante="outline-primary" onClick={() => setAccion({ id: c.id, tipo: 'reagendar' })}>
                          Otro horario
                        </Boton>
                      )}
                      {activa && (
                        <Boton variante="outline-danger" onClick={() => setAccion({ id: c.id, tipo: 'cancelar' })}>
                          Cancelar cita
                        </Boton>
                      )}
                      <Boton variante="outline-secondary" onClick={() => onVerComprobante(c)}>
                        Comprobante
                      </Boton>
                    </span>
                  </td>
                </tr>

                {accion?.id === c.id && (
                  <tr>
                    <td colSpan={8} className="bg-light">
                      {accion.tipo === 'reagendar' ? (
                        <FormularioReagendar hoy={hoy} onEnviar={(h) => reagendar(c, h)} onCancelar={() => setAccion(null)} />
                      ) : (
                        <span className="d-flex flex-wrap gap-2 align-items-center">
                          <span>¿Cancelar la cita de {c.mascota}?</span>
                          <Boton variante="danger" onClick={() => cancelar(c)}>
                            Sí, cancelar
                          </Boton>
                          <Boton variante="secondary" onClick={() => setAccion(null)}>
                            No
                          </Boton>
                        </span>
                      )}
                    </td>
                  </tr>
                )}
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}