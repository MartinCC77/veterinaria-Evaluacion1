import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LayoutPrincipal from '../components/templates/LayoutPrincipal'
import FormularioRegistro from '../components/organisms/FormularioRegistro'
import { useAuth } from '../context/AuthContext'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function Registro() {
  const navigate = useNavigate()
  const { registrar } = useAuth()
  const [errorGeneral, setErrorGeneral] = useState('')
  useTituloPagina('Crear cuenta')

  function crearCuenta(datos) {
    const resultado = registrar(datos)
    if (!resultado.ok) {
      setErrorGeneral(resultado.error)
      return
    }
    navigate('/')
  }

  return (
    <LayoutPrincipal>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <h1 className="h2 text-primary mb-3">Crear cuenta</h1>
          <FormularioRegistro onEnviar={crearCuenta} errorGeneral={errorGeneral} />
        </div>
      </div>
    </LayoutPrincipal>
  )
}