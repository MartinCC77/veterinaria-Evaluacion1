import CampoTexto from '../atoms/CampoTexto'
import Selector from '../atoms/Selector'

export default function CampoFormulario({
  id,
  etiqueta,
  valor,
  onCambio,
  error = '', 
  tipo = 'text', 
  opciones = [],
  placeholder,
  minimo,
}) {
  const hayError = error !== ''

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-semibold">
        {etiqueta}
      </label>

      {tipo === 'select' ? (
        <Selector id={id} valor={valor} onCambio={onCambio} opciones={opciones} invalido={hayError} />
      ) : (
        <CampoTexto
          id={id}
          valor={valor}
          onCambio={onCambio}
          tipo={tipo}
          placeholder={placeholder}
          invalido={hayError}
          minimo={minimo}
        />
      )}

      {}
      {hayError && (
        <div className="invalid-feedback d-block" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}