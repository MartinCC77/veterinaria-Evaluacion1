import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { UsuariosProvider } from './context/UsuariosContext'
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
import Login from './pages/Login'
import Registro from './pages/Registro'
import AdminDashboard from './pages/AdminDashboard'
import AdminServicios from './pages/AdminServicios'
import AdminServicioForm from './pages/AdminServicioForm'
import AdminCitas from './pages/AdminCitas'
import AdminCita from './pages/AdminCita'
import AdminCriticos from './pages/AdminCriticos'
import AdminReportes from './pages/AdminReportes'
import AdminPerfil from './pages/AdminPerfil'
import NoEncontrada from './pages/NoEncontrada'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UsuariosProvider>
          <ServiciosProvider>
            <CitasProvider>
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
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/servicios" element={<AdminServicios />} />
                <Route path="/admin/servicios/nuevo" element={<AdminServicioForm />} />
                <Route path="/admin/servicios/:id/editar" element={<AdminServicioForm />} />
                <Route path="/admin/citas" element={<AdminCitas />} />
                <Route path="/admin/citas/:id" element={<AdminCita />} />
                <Route path="/admin/criticos" element={<AdminCriticos />} />
                <Route path="/admin/reportes" element={<AdminReportes />} />
                <Route path="/admin/perfil" element={<AdminPerfil />} />
                <Route path="*" element={<NoEncontrada />} />
              </Routes>
            </CitasProvider>
          </ServiciosProvider>
        </UsuariosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}