export default function Boton({
  children,
  variante = 'primary', 
  tipo = 'button', 
  onClick,
  deshabilitado = false,
  bloque = false, 
}) {
  const clases = `btn btn-${variante}${bloque ? ' w-100' : ''}`

  return (
    <button type={tipo} className={clases} onClick={onClick} disabled={deshabilitado}>
      {children}
    </button>
  )
}