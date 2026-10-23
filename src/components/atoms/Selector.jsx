export default function Selector({ id, valor, onCambio, opciones, placeholder = 'Seleccione una opción', invalido = false }) {
  return (
    <select
      id={id}
      className={`form-select${invalido ? ' is-invalid' : ''}`}
      value={valor}
      onChange={(evento) => onCambio(evento.target.value)}
    >
      <option value="">{placeholder}</option>
      {opciones.map((o) => (
        <option key={o.valor} value={o.valor}>
          {o.etiqueta}
        </option>
      ))}
    </select>
  )
}