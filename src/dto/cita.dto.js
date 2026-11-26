// Solicitud de cita: solo viajan los datos que el servidor necesita.
// El dueño lo toma el servidor desde el token y el precio lo calcula él mismo.
export function citaRequestDto(formulario) {
  return {
    mascota: formulario.mascota,
    especie: formulario.especie,
    servicioId: Number(formulario.servicioId),
    fecha: formulario.fecha,
    hora: formulario.hora,
    motivo: formulario.motivo,
    urgencia: Boolean(formulario.urgencia),
  }
}

// Nuevo horario que propone el personal
export function reagendarRequestDto(horario) {
  return { fecha: horario.fecha, hora: horario.hora }
}