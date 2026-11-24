import { useState } from 'react'
import Boton from '../atoms/Boton'
import FormularioCategoria from './FormularioCategoria'

export default function TablaCategoriasAdmin({ categorias, onRenombrar }) {
  const [editando, setEditando] = useState(null)
  const [error, setError] = useState('')

  function guardar(nombreActual, nombreNuevo) {
    const resultado = onRenombrar(nombreActual, nombreNuevo)
    if (resultado.ok) {
      setEditando(null)
      setError('')
    } else {
      setError(resultado.error)
    }
  }

  function empezarEdicion(nombre) {
    setEditando(nombre)
    setError('')
  }

  if (categorias.length === 0) {
    return <p className="text-muted">No hay categorías registradas.</p>
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle bg-white">
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Servicios</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((c) => (
            <tr key={c.nombre}>
              {editando === c.nombre ? (
                <td colSpan={3}>
                  <FormularioCategoria
                    id="categoria-editar"
                    etiqueta={`Nuevo nombre para "${c.nombre}"`}
                    valorInicial={c.nombre}
                    textoBoton="Guardar"
                    errorGeneral={error}
                    onEnviar={(nuevo) => guardar(c.nombre, nuevo)}
                    onCancelar={() => setEditando(null)}
                  />
                </td>
              ) : (
                <>
                  <td>{c.nombre}</td>
                  <td>{c.cantidad}</td>
                  <td>
                    <Boton variante="outline-primary" onClick={() => empezarEdicion(c.nombre)}>
                      Editar
                    </Boton>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}