import { useNavigate } from 'react-router-dom'
import LayoutPrincipal from '../components/templates/LayoutPrincipal'
import ListaServicios from '../components/organisms/ListaServicios'
import ListaCategorias from '../components/organisms/ListaCategorias'
import Boton from '../components/atoms/Boton'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { contarPorCategoria } from '../utils/filtros'

export default function Inicio() {
  const navigate = useNavigate()
  const { servicios } = useServicios()
  useTituloPagina('Inicio')

  return (
    <LayoutPrincipal>
      <section className="p-4 p-md-5 mb-4 bg-primary text-white rounded-3">
        <h1 className="display-5 fw-bold">Veterinaria San Marcos</h1>
        <p className="lead">Cuidado ideal para tu mascota, en Rancagua desde 2009.</p>
        <Boton variante="light" onClick={() => navigate('/solicitar-cita')}>
          Solicitar cita
        </Boton>
      </section>

      <section className="mb-5">
        <h2 className="text-primary mb-3">Categorías</h2>
        <ListaCategorias
          categorias={contarPorCategoria(servicios)}
          onVer={(nombre) => navigate(`/categorias/${encodeURIComponent(nombre)}`)}
        />
      </section>

      <section className="mb-5">
        <h2 className="text-primary mb-3">Nuestros servicios médicos</h2>
        <ListaServicios
          servicios={servicios.slice(0, 3)}
          onSolicitar={(s) => navigate(`/solicitar-cita/${s.id}`)}
          onVerDetalle={(s) => navigate(`/servicios/${s.id}`)}
        />
      </section>

      <section className="mb-5">
        <h2 className="text-primary mb-3">Conoce nuestras instalaciones</h2>
        <div className="ratio ratio-16x9">
          <iframe src="https://www.youtube.com/embed/sksm_mfbdA0" title="Instalaciones Veterinaria San Marcos" allowFullScreen />
        </div>
      </section>

      <section>
        <h2 className="text-primary mb-3">Encuéntranos en Rancagua</h2>
        <p>Atención de lunes a sábado.</p>
        <div className="ratio ratio-21x9">
          <iframe
            title="Mapa de la clínica"
            loading="lazy"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13233.918451996542!2d-70.7791829!3d-34.1635005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9663436c5fb23e41%3A0x11c6602627eab35!2sClinica%20Veterinaria%20Preventy%20Vet!5e0!3m2!1ses!2scl!4v1710000000000!5m2!1ses!2scl"
          />
        </div>
      </section>
    </LayoutPrincipal>
  )
}