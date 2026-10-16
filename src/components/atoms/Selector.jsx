export default function Selector({ id, valor, onCambio, opciones, placeholder = 'Seleccione una opción', invalido = false }) {
  return (
    <select
      id={id}
      className={`form-select${invalido ? ' is-invalid' : ''}`}
      value={valor}
      onChange={(evento) => onCambio(evento.target.value)}
    >
      {/* La primera opción tiene valor vacío: significa "no eligió nada" */}
      <option value="">{placeholder}</option>
      {/* map recorre la lista y dibuja una <option> por cada elemento. "key" ayuda a React a distinguirlas */}
      {opciones.map((o) => (
        <option key={o.valor} value={o.valor}>
          {o.etiqueta}
        </option>
      ))}
    </select>
  )
}