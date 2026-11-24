// Página: AdminCategorias (ruta "/admin/categorias"). Categorías nuevas y renombrar las existentes.
import { useState } from 'react'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import FormularioCategoria from '../components/organisms/FormularioCategoria'
import TablaCategoriasAdmin from '../components/organisms/TablaCategoriasAdmin'
import { useCategorias } from '../context/CategoriasContext'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { resumirCategorias } from '../utils/filtros'

export default function AdminCategorias() {
  const { categorias, crear, renombrar } = useCategorias()
  const { servicios, actualizar } = useServicios()
  const [errorNueva, setErrorNueva] = useState('')
  const [version, setVersion] = useState(0)
  useTituloPagina('Categorías (admin)')

  function agregar(nombre) {
    const resultado = crear(nombre)
    setErrorNueva(resultado.ok ? '' : resultado.error)
    if (resultado.ok) {
      setVersion(version + 1)
    }
  }

  function cambiarNombre(nombreActual, nombreNuevo) {
    const resultado = renombrar(nombreActual, nombreNuevo)
    if (resultado.ok) {
      servicios.filter((s) => s.categoria === nombreActual).forEach((s) => actualizar(s.id, { categoria: nombreNuevo }))
    }
    return resultado
  }

  return (
    <PlantillaAdmin soloAdministrador>
      <h1 className="h2 text-primary mb-3">Categorías</h1>

      <div className="card card-body shadow-sm mb-4">
        <h2 className="h5">Nueva categoría</h2>
        {/* "key" distinta = React crea un formulario nuevo y limpio */}
        <FormularioCategoria key={version} onEnviar={agregar} errorGeneral={errorNueva} />
      </div>

      <TablaCategoriasAdmin categorias={resumirCategorias(categorias, servicios)} onRenombrar={cambiarNombre} />
    </PlantillaAdmin>
  )
}