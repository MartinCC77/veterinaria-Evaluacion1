import { useState } from 'react'
import CampoFormulario from '../molecules/CampoFormulario'
import CampoTexto from '../atoms/CampoTexto'
import Selector from '../atoms/Selector'
import Boton from '../atoms/Boton'

const inicial = { dueno: '', correo: '', mascota: '', especie: '', motivo: '' }

const especies = [
  { value: 'perro', label: 'Perro' },
  { value: 'gato', label: 'Gato' },
  { value: 'conejo', label: 'Conejo' },
  { value: 'ave', label: 'Ave / Otra' },
]

function validar(v) {
  const e = {}
  if (v.dueno.trim().length < 3) e.dueno = 'Ingresa tu nombre completo (minimo 3 caracteres).'
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.correo.trim())) e.correo = 'Error: Ingresa un correo valido (ejemplo: cliente@dominio.cl).'
  if (v.mascota.trim() === '') e.mascota = 'Error: El nombre de la mascota es obligatorio.'
  if (v.especie === '') e.especie = 'Error: Selecciona la especie de la mascota.'
  if (v.motivo.trim().length < 5) e.motivo = 'Sugerencia: Describe el motivo con al menos 5 caracteres.'
  return e
}

export default function FormularioSolicitudCita() {
  const [valores, setValores] = useState(inicial)
  const [errores, setErrores] = useState({})
  const [exito, setExito] = useState('')

  const cambiar = (e) => setValores({ ...valores, [e.target.name]: e.target.value })

  const enviar = (e) => {
    e.preventDefault()
    const nuevos = validar(valores)
    setErrores(nuevos)
    if (Object.keys(nuevos).length === 0) {
      setExito('Solicitud enviada con exito.')
      setValores(inicial)
    } else {
      setExito('')
    }
  }

  return (
    <section id="seccion-cita">
      <h2>Solicitar Cita Medica</h2>
      <p>Complete el formulario para reservar su hora de atencion.</p>

      <form onSubmit={enviar} noValidate>
        <CampoFormulario id="dueno" etiqueta="Nombre de su Dueño/a:" error={errores.dueno}>
          <CampoTexto id="dueno" value={valores.dueno} onChange={cambiar} autoComplete="name"
            placeholder="Ej: Juan Perez" error={!!errores.dueno} />
        </CampoFormulario>

        <CampoFormulario id="correo" etiqueta="Correo electronico:" error={errores.correo}>
          <CampoTexto id="correo" type="email" value={valores.correo} onChange={cambiar} autoComplete="email"
            placeholder="ejemplo@correo.com" error={!!errores.correo} />
        </CampoFormulario>

        <CampoFormulario id="mascota" etiqueta="Nombre de la Mascota:" error={errores.mascota}>
          <CampoTexto id="mascota" value={valores.mascota} onChange={cambiar}
            placeholder="Ej: Cachulo" error={!!errores.mascota} />
        </CampoFormulario>

        <CampoFormulario id="especie" etiqueta="Especie:" error={errores.especie}>
          <Selector id="especie" value={valores.especie} onChange={cambiar} opciones={especies}
            placeholder="Seleccione una opcion:" error={!!errores.especie} />
        </CampoFormulario>

        <CampoFormulario id="motivo" etiqueta="Motivo de la consulta:" error={errores.motivo}>
          <CampoTexto id="motivo" multilinea value={valores.motivo} onChange={cambiar}
            placeholder="Describa brevemente el motivo de la atencion" error={!!errores.motivo} />
        </CampoFormulario>

        <Boton type="submit" id="btn-enviar">Reservar cita</Boton>
        <p className="alerta-exito">{exito}</p>
      </form>
    </section>
  )
}