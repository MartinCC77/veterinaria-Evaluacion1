export default function CampoFormulario({ id, etiqueta, error, children }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-semibold">{etiqueta}</label>
      {children}
      {error && <div className="invalid-feedback d-block fw-bold">{error}</div>}
    </div>
  )
}