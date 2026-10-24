// Página: Login (ruta "/login"). Decide qué hacer cuando el formulario avisa que todo está correcto.
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LayoutPrincipal from '../components/templates/LayoutPrincipal'
import FormularioLogin from '../components/organisms/FormularioLogin'
import { useAuth } from '../context/AuthContext'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function Login() {
  const navigate = useNavigate()
  const { iniciarSesion } = useAuth()
  const [errorGeneral, setErrorGeneral] = useState('')
  useTituloPagina('Ingresar')

  function ingresar({ correo, clave }) {
    const resultado = iniciarSesion(correo, clave)
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
          <h1 className="h2 text-primary mb-3">Ingresar</h1>
          <FormularioLogin onEnviar={ingresar} errorGeneral={errorGeneral} />
          <p className="mt-3">
            ¿No tienes cuenta?{' '}
            <a
              href="/registro"
              onClick={(e) => {
                e.preventDefault()
                navigate('/registro')
              }}
            >
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </LayoutPrincipal>
  )
}