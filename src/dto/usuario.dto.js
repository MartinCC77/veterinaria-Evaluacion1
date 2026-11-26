// DTOs de entrada: convierten los datos del formulario al formato que exige la API

export function loginRequestDto(formulario) {
  return {
    correo: formulario.correo.trim().toLowerCase(),
    contrasena: formulario.clave,
  }
}

export function registroRequestDto(formulario) {
  return {
    nombre: formulario.nombre.trim(),
    correo: formulario.correo.trim().toLowerCase(),
    contrasena: formulario.clave,
  }
}

// Sirve para crear y para modificar un usuario desde el panel de administración.
// La contraseña solo viaja si el formulario la trae (al editar es opcional).
export function usuarioRequestDto(formulario) {
  const dto = {
    nombre: formulario.nombre.trim(),
    correo: formulario.correo.trim().toLowerCase(),
    rol: formulario.rol,
  }
  if (formulario.clave) {
    dto.contrasena = formulario.clave
  }
  return dto
}