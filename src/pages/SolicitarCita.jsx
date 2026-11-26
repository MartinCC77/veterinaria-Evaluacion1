import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LayoutPrincipal from '../components/templates/LayoutPrincipal'
import FormularioSolicitudCita from '../components/organisms/FormularioSolicitudCita'
import { useServicios } from '../context/ServiciosContext'
import { useCitas } from '../context/CitasContext'
import { useAuth } from '../context/AuthContext'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function SolicitarCita() {
  const navigate = useNavigate()
  const params = useParams()
  const { servicios } = useServicios()
  const { crear } = useCitas()
  const { usuario } = useAuth()
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)
  useTituloPagina('Solicitar cita')

  const existe = servicios.some((s) => String(s.id) === params.servicioId)

  async function guardarCita(datos) {
    setError('')
    setEnviando(true)
    const resultado = await crear(datos)
    setEnviando(false)
    if (!resultado.ok) {
      setError(resultado.error)
      return
    }
    navigate(`/cita-confirmada/${resultado.datos.id}`)
  }

  return (
    <LayoutPrincipal>
      <h1 className="h2 text-primary">Solicitar cita médica</h1>
      <p>Completa el formulario para reservar la hora de atención de tu mascota.</p>
      {error !== '' && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {enviando && (
        <p className="text-muted" role="status">
          Enviando solicitud...
        </p>
      )}
      <FormularioSolicitudCita
        servicios={servicios}
        servicioInicial={existe ? params.servicioId : ''}
        datosIniciales={{ dueno: usuario ? usuario.nombre : '', correo: usuario ? usuario.correo : '' }}
        onEnviar={guardarCita}
      />
    </LayoutPrincipal>
  )
}