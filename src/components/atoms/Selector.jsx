export default function Selector({ id, value, onChange, opciones, placeholder, error = false }) {
  return (
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className={`form-select ${error ? 'is-invalid' : ''}`}
    >
      <option value="">{placeholder}</option>
      {opciones.map((op) => (
        <option key={op.value} value={op.value}>{op.label}</option>
      ))}
    </select>
  )
}