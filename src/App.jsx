import { Routes, Route } from 'react-router-dom'
import LayoutPrincipal from './components/templates/LayoutPrincipal'
import Inicio from './pages/Inicio'
import Servicios from './pages/Servicios'
import SolicitarCita from './pages/SolicitarCita'

export default function App() {
  return (
    <Routes>
      <Route element={<LayoutPrincipal />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/citas" element={<SolicitarCita />} />
      </Route>
    </Routes>
  )
}