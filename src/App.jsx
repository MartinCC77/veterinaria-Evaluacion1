import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { UsuariosProvider } from './context/UsuariosContext'
import { CategoriasProvider } from './context/CategoriasContext'
import { ServiciosProvider } from './context/ServiciosContext'
import { CitasProvider } from './context/CitasContext'
import RutaProtegida from './components/templates/RutaProtegida'
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
import AdminCategorias from './pages/AdminCategorias'
import AdminUsuarios from './pages/AdminUsuarios'
import AdminUsuarioForm from './pages/AdminUsuarioForm'
import AdminUsuarioHistorial from './pages/AdminUsuarioHistorial'
import NoEncontrada from './pages/NoEncontrada'

// Roles que pueden entrar a cada grupo de rutas
const PERSONAL = ['administrador', 'recepcionista']
const SOLO_ADMIN = ['administrador']

// Atajo: exige sesión y, si se indican roles, que el usuario tenga uno de ellos
function protegida(pagina, roles = null) {
  return <RutaProtegida roles={roles}>{pagina}</RutaProtegida>
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UsuariosProvider>
          <CategoriasProvider>
            <ServiciosProvider>
              <CitasProvider>
                <Routes>
                  {/* Rutas públicas */}
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
                  <Route path="/login" element={<Login />} />
                  <Route path="/registro" element={<Registro />} />

                  {/* Rutas que exigen sesión (cualquier rol) */}
                  <Route path="/solicitar-cita/:servicioId?" element={protegida(<SolicitarCita />)} />
                  <Route path="/cita-confirmada/:id" element={protegida(<CitaConfirmada />)} />
                  <Route path="/mis-citas" element={protegida(<MisCitas />)} />

                  {/* Panel: administrador y recepcionista */}
                  <Route path="/admin" element={protegida(<AdminDashboard />, PERSONAL)} />
                  <Route path="/admin/citas" element={protegida(<AdminCitas />, PERSONAL)} />
                  <Route path="/admin/citas/:id" element={protegida(<AdminCita />, PERSONAL)} />
                  <Route path="/admin/criticos" element={protegida(<AdminCriticos />, PERSONAL)} />
                  <Route path="/admin/reportes" element={protegida(<AdminReportes />, PERSONAL)} />
                  <Route path="/admin/perfil" element={protegida(<AdminPerfil />, PERSONAL)} />

                  {/* Panel: solo administrador */}
                  <Route path="/admin/servicios" element={protegida(<AdminServicios />, SOLO_ADMIN)} />
                  <Route path="/admin/servicios/nuevo" element={protegida(<AdminServicioForm />, SOLO_ADMIN)} />
                  <Route path="/admin/servicios/:id/editar" element={protegida(<AdminServicioForm />, SOLO_ADMIN)} />
                  <Route path="/admin/categorias" element={protegida(<AdminCategorias />, SOLO_ADMIN)} />
                  <Route path="/admin/usuarios" element={protegida(<AdminUsuarios />, SOLO_ADMIN)} />
                  <Route path="/admin/usuarios/nuevo" element={protegida(<AdminUsuarioForm />, SOLO_ADMIN)} />
                  <Route path="/admin/usuarios/:id/editar" element={protegida(<AdminUsuarioForm />, SOLO_ADMIN)} />
                  <Route path="/admin/usuarios/:id/historial" element={protegida(<AdminUsuarioHistorial />, SOLO_ADMIN)} />

                  {/* "*" coincide con cualquier dirección que no calce con las demás */}
                  <Route path="*" element={<NoEncontrada />} />
                </Routes>
              </CitasProvider>
            </ServiciosProvider>
          </CategoriasProvider>
        </UsuariosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}