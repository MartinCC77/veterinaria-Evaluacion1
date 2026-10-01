export default function Boton({ children, type = 'button', id, onClick }) {
  return (
    <button type={type} id={id} onClick={onClick}>
      {children}
    </button>
  )
}