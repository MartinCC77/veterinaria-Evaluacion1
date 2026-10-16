
export function validarObligatorio(valor, nombreCampo) {
  if (valor.trim() === '') {
    return `${nombreCampo} es obligatorio.`
  }
  return ''
}


export function validarNombreDueno(valor) {
  if (valor.trim().length < 3) {
    return 'Ingresa tu nombre completo (mínimo 3 caracteres).'
  }
  return ''
}

export function validarCorreo(valor) {
  const patron = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
  if (!patron.test(valor.trim())) {
    return 'Ingresa un correo válido (ejemplo: cliente@dominio.cl).'
  }
  return ''
}


export function validarMascota(valor) {
  return validarObligatorio(valor, 'El nombre de la mascota')
}


export function validarSeleccion(valor, nombreCampo) {
  if (valor === '') {
    return `Selecciona ${nombreCampo}.`
  }
  return ''
}


export function validarMotivo(valor) {
  if (valor.trim().length < 5) {
    return 'Describe el motivo con al menos 5 caracteres.'
  }
  return ''
}


export function validarFecha(valor, hoy) {
  if (valor === '') {
    return 'Selecciona una fecha.'
  }

  if (valor < hoy) {
    return 'La fecha no puede ser anterior a hoy.'
  }
  return ''
}


export function validarClave(valor) {
  if (valor.length < 6) {
    return 'La clave debe tener al menos 6 caracteres.'
  }
  return ''
}