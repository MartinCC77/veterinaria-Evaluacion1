export default function CampoTexto({
  id,
  valor,
  onCambio,
  tipo = 'text', 
  placeholder = '',
  invalido = false, 
  minimo, 
  autoComplete,
}) {
  const clases = `form-control${invalido ? ' is-invalid' : ''}`

  const manejarCambio = (evento) => onCambio(evento.target.value)


  if (tipo === 'textarea') {
    return (
      <textarea
        id={id}
        className={clases}
        rows={3}
        value={valor}
        onChange={manejarCambio}
        placeholder={placeholder}
      />
    )
  }

  return (
    <input
      id={id}
      type={tipo}
      className={clases}
      value={valor}
      onChange={manejarCambio}
      placeholder={placeholder}
      min={minimo}
      autoComplete={autoComplete}
    />
  )
}