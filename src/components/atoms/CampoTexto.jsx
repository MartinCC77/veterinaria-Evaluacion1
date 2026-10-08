export default function CampoTexto({
  id, value, onChange, type = 'text', placeholder, autoComplete, multilinea = false, error = false,
}) {
  const clase = `form-control ${error ? 'is-invalid' : ''}`
  const props = { id, name: id, value, onChange, placeholder, className: clase }

  if (multilinea) return <textarea rows="3" {...props} />
  return <input type={type} autoComplete={autoComplete} {...props} />
}