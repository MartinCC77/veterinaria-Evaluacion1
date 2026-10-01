export default function CampoTexto({
  id, value, onChange, type = 'text', placeholder, autoComplete, multilinea = false, error = false,
}) {
  const clase = error ? 'input-error' : ''
  const props = { id, name: id, value, onChange, placeholder, className: clase }

  if (multilinea) return <textarea {...props} />
  return <input type={type} autoComplete={autoComplete} {...props} />
}