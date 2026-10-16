const ICONOS = {
  perro: '🐶',
  gato: '🐱',
  conejo: '🐰',
  ave: '🐦',
  cita: '📅',
  telefono: '📞',
  ubicacion: '📍',
  reloj: '🕒',
}

export default function Icono({ nombre }) {
  return (
    <span role="img" aria-label={nombre}>
      {ICONOS[nombre] ?? '•'}
    </span>
  )
}