import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ServiciosProvider } from './context/ServiciosContext'
import { CitasProvider } from './context/CitasContext'
import Inicio from './pages/Inicio'
import Servicios from './pages/Servicios'
import DetalleServicio from './pages/DetalleServicio'
import Categorias from './pages/Categorias'
import Categoria from './pages/Categoria'
import Ofertas from './pages/Ofertas'
import Blog from './pages/Blog'
import DetalleBlog from './pages/DetalleBlog'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
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
            <Route path="/servicios/:id" element={<DetalleServicio />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/categorias/:nombre" element={<Categoria />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<DetalleBlog />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/solicitar-cita/:servicioId?" element={<SolicitarCita />} />
            <Route path="/cita-confirmada/:id" element={<CitaConfirmada />} />
            <Route path="/mis-citas" element={<MisCitas />} />
            <Route path="*" element={<NoEncontrada />} />
          </Routes>
        </CitasProvider>
      </ServiciosProvider>
    </BrowserRouter>
  )
}