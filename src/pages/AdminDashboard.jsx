import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import TarjetaResumen from '../components/molecules/TarjetaResumen'
import { useServicios } from '../context/ServiciosContext'
import { useCitas } from '../context/CitasContext'
import { useUsuarios } from '../context/UsuariosContext'
import { useAuth } from '../context/AuthContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { contarCitasPorEstado } from '../utils/reportes'
import { obtenerOfertas } from '../utils/filtros'
import { esAdministrador } from '../utils/permisos'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { servicios } = useServicios()
  const { citas } = useCitas()
  const { usuarios, recargar } = useUsuarios()
  const { usuario } = useAuth()
  useTituloPagina('Dashboard')

  useEffect(() => {
    recargar()
  }, [])

  const porEstado = contarCitasPorEstado(citas)

  return (
    <PlantillaAdmin>
      <h1 className="h2 text-primary mb-3">Dashboard</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
        <div className="col">
          <TarjetaResumen
            titulo="Solicitudes pendientes"
            valor={porEstado.pendiente}
            detalle={`${citas.length} solicitudes en total`}
            onVer={() => navigate('/admin/citas')}
            textoBoton="Gestionar solicitudes"
          />
        </div>
        <div className="col">
          <TarjetaResumen
            titulo="Servicios del catálogo"
            valor={servicios.length}
            detalle={`${obtenerOfertas(servicios).length} en oferta`}
            onVer={esAdministrador(usuario) ? () => navigate('/admin/servicios') : undefined}
            textoBoton="Gestionar servicios"
          />
        </div>
        <div className="col">
          <TarjetaResumen
            titulo="Usuarios registrados"
            valor={usuarios.length}
            detalle="Administradores, recepción y dueños"
            onVer={esAdministrador(usuario) ? () => navigate('/admin/usuarios') : undefined}
            textoBoton="Gestionar usuarios"
          />
        </div>
      </div>
    </PlantillaAdmin>
  )
}