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
  useTituloPagina('Solicitar cita')

  const existe = servicios.some((s) => String(s.id) === params.servicioId)

  function guardarCita(datos) {
    const nueva = crear({ ...datos, usuarioId: usuario ? usuario.id : null })
    navigate(`/cita-confirmada/${nueva.id}`)
  }

  return (
    <LayoutPrincipal>
      <h1 className="h2 text-primary">Solicitar cita médica</h1>
      <p>Completa el formulario para reservar la hora de atención de tu mascota.</p>
      <FormularioSolicitudCita
        servicios={servicios}
        servicioInicial={existe ? params.servicioId : ''}
        datosIniciales={{ dueno: usuario ? usuario.nombre : '', correo: usuario ? usuario.correo : '' }}
        onEnviar={guardarCita}
      />
    </LayoutPrincipal>
  )
}