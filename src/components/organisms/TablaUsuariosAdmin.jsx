import { useState } from 'react'
import Boton from '../atoms/Boton'
import { etiquetaRol } from '../../utils/permisos'

export default function TablaUsuariosAdmin({ usuarios, usuarioActualId, onEditar, onHistorial, onEliminar }) {
  const [pendiente, setPendiente] = useState(null)

  if (usuarios.length === 0) {
    return <p className="text-muted">No hay usuarios registrados.</p>
  }

  function confirmar(usuario) {
    onEliminar(usuario)
    setPendiente(null)
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle bg-white">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.correo}</td>
              <td>{etiquetaRol(u.rol)}</td>
              <td>
                {pendiente === u.id ? (
                  <span className="d-flex flex-wrap gap-2 align-items-center">
                    <span>¿Eliminar a "{u.nombre}"?</span>
                    <Boton variante="danger" onClick={() => confirmar(u)}>
                      Sí, eliminar
                    </Boton>
                    <Boton variante="secondary" onClick={() => setPendiente(null)}>
                      Cancelar
                    </Boton>
                  </span>
                ) : (
                  <span className="d-flex flex-wrap gap-2">
                    <Boton variante="outline-primary" onClick={() => onEditar(u)}>
                      Editar
                    </Boton>
                    <Boton variante="outline-secondary" onClick={() => onHistorial(u)}>
                      Historial
                    </Boton>
                    <Boton variante="outline-danger" deshabilitado={u.id === usuarioActualId} onClick={() => setPendiente(u.id)}>
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