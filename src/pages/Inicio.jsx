import ListaServicios from '../components/organisms/ListaServicios'

const URL_MAPA =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13233.918451996542!2d-70.7791829!3d-34.1635005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9663436c5fb23e41%3A0x11c6602627eab35!2sClinica%20Veterinaria%20Preventy%20Vet!5e0!3m2!1ses!2scl!4v1710000000000!5m2!1ses!2scl'

export default function Inicio() {
  return (
    <>
      <ListaServicios />

      <section id="video-promocional" className="mb-4">
        <h2 className="text-vet mb-3">Conoce nuestras instalaciones</h2>
        <div className="bg-white p-2 rounded shadow-sm">
          <div className="ratio ratio-16x9">
            <iframe
              src="https://www.youtube.com/embed/sksm_mfbdA0"
              title="Instalaciones Veterinaria San Marcos"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section id="ubicacion">
        <h2 className="text-vet mb-3">Encuentranos en Rancagua</h2>
        <p>Atencion de lunes a sabado, esta es nuestra ubicacion exacta:</p>
        <div className="bg-white p-2 rounded shadow-sm">
          <iframe
            src={URL_MAPA}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Mapa de ubicacion"
          />
        </div>
      </section>
    </>
  )
}