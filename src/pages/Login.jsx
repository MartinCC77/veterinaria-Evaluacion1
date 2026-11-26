import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LayoutPrincipal from '../components/templates/LayoutPrincipal'
import FormularioLogin from '../components/organisms/FormularioLogin'
import { useAuth } from '../context/AuthContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { esPersonal } from '../utils/permisos'

export default function Login() {
  const navigate = useNavigate()
  const ubicacion = useLocation()
  const { iniciarSesion } = useAuth()
  const [errorGeneral, setErrorGeneral] = useState('')
  const [cargando, setCargando] = useState(false)
  useTituloPagina('Ingresar')

  async function ingresar({ correo, clave }) {
    setCargando(true)
    setErrorGeneral('')
    const resultado = await iniciarSesion(correo, clave)
    setCargando(false)
    if (!resultado.ok) {
      setErrorGeneral(resultado.error)
      return
    }
    // Si venía de una ruta protegida vuelve a ella; si no, va según su rol
    const destino = ubicacion.state?.desde ?? (esPersonal(resultado.usuario) ? '/admin' : '/')
    navigate(destino, { replace: true })
  }

  return (
    <LayoutPrincipal>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <h1 className="h2 text-primary mb-3">Ingresar</h1>
          <FormularioLogin onEnviar={ingresar} errorGeneral={errorGeneral} cargando={cargando} />
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