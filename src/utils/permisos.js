export function esPersonal(usuario) {
  return usuario?.rol === 'administrador' || usuario?.rol === 'recepcionista'
}

export function esAdministrador(usuario) {
  return usuario?.rol === 'administrador'
}