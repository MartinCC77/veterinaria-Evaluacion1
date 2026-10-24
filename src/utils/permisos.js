export function esPersonal(usuario) {
  return usuario?.rol === 'administrador' || usuario?.rol === 'recepcionista'
}

export function esAdministrador(usuario) {
  return usuario?.rol === 'administrador'
}

export function etiquetaRol(rol) {
  const etiquetas = {
    administrador: 'Administrador',
    recepcionista: 'Recepcionista',
    dueno: 'Dueño de mascota',
  }
  return etiquetas[rol] ?? rol
}