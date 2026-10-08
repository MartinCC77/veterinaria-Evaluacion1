export default function Boton({ children, type = 'button', id, onClick }) {
  return (
    <button type={type} id={id} onClick={onClick} className="btn btn-vet w-100 py-2">
      {children}
    </button>
  )
}