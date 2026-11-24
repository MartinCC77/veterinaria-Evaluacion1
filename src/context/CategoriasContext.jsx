import { createContext, useContext, useState } from 'react'
import * as categoriaService from '../services/categoriaService'

const CategoriasContext = createContext(null)

export function CategoriasProvider({ children }) {
  const [categorias, setCategorias] = useState(() => categoriaService.listarCategorias())

  function crear(nombre) {
    try {
      categoriaService.crearCategoria(nombre)
      setCategorias(categoriaService.listarCategorias())
      return { ok: true }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  function renombrar(nombreActual, nombreNuevo) {
    try {
      categoriaService.renombrarCategoria(nombreActual, nombreNuevo)
      setCategorias(categoriaService.listarCategorias())
      return { ok: true }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  return <CategoriasContext.Provider value={{ categorias, crear, renombrar }}>{children}</CategoriasContext.Provider>
}

export function useCategorias() {
  const contexto = useContext(CategoriasContext)
  if (!contexto) {
    throw new Error('useCategorias debe usarse dentro de un CategoriasProvider')
  }
  return contexto
}