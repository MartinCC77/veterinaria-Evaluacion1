import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ServiciosProvider } from './context/ServiciosContext'
import { CitasProvider } from './context/CitasContext'
import Inicio from './pages/Inicio'
import Servicios from './pages/Servicios'
import SolicitarCita from './pages/SolicitarCita'
import CitaConfirmada from './pages/CitaConfirmada'
import MisCitas from './pages/MisCitas'
import NoEncontrada from './pages/NoEncontrada'

export default function App() {
  return (
    <BrowserRouter>
      <ServiciosProvider>
        <CitasProvider>
          {}
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/servicios" element={<Servicios />} />
            {}
            <Route path="/solicitar-cita/:servicioId?" element={<SolicitarCita />} />
            <Route path="/cita-confirmada/:id" element={<CitaConfirmada />} />
            <Route path="/mis-citas" element={<MisCitas />} />
            {}
            <Route path="*" element={<NoEncontrada />} />
          </Routes>
        </CitasProvider>
      </ServiciosProvider>
    </BrowserRouter>
  )
}