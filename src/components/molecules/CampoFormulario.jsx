export default function CampoFormulario({ id, etiqueta, error, children }) {
  return (
    <div className="grupo-campo">
      <label htmlFor={id}>{etiqueta}</label>
      {children}
      <span className="mensaje-error">{error}</span>
    </div>
  )
}