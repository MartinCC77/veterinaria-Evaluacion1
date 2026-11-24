import { useEffect, useState } from "react";
import LayoutPrincipal from "../components/templates/LayoutPrincipal";
import { useTituloPagina } from "../hooks/useTituloPagina";
import api from "../api";

const vacio = { id: null, nombre: "", email: "", password: "", rol: "USER" };

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState(vacio);
  const [error, setError] = useState("");
  useTituloPagina("Usuarios");

  const cargar = async () => {
    try {
      const res = await api.get("/usuarios");
      setUsuarios(res.data);
    } catch {
      setError("No se pudieron cargar los usuarios");
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const guardar = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (form.id) {
        await api.put(`/usuarios/${form.id}`, {
          nombre: form.nombre,
          email: form.email,
          rol: form.rol,
          password: form.password,
        });
      } else {
        await api.post("/usuarios", form);
      }
      setForm(vacio);
      cargar();
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al guardar");
    }
  };

  const editar = (u) => setForm({ ...u, password: "" });

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar este usuario?")) return;
    try {
      await api.delete(`/usuarios/${id}`);
      cargar();
    } catch {
      setError("No se pudo eliminar");
    }
  };

  return (
    <LayoutPrincipal>
      <h1 className="h2 text-primary mb-3">Gestión de usuarios</h1>

      <form onSubmit={guardar} className="row g-2 mb-4">
        <div className="col-md-3">
          <input name="nombre" className="form-control" placeholder="Nombre"
            value={form.nombre} onChange={handleChange} required />
        </div>
        <div className="col-md-3">
          <input name="email" type="email" className="form-control" placeholder="Correo"
            value={form.email} onChange={handleChange} required />
        </div>
        <div className="col-md-2">
          <input name="password" type="password" className="form-control"
            placeholder={form.id ? "Nueva clave (opcional)" : "Contraseña"}
            value={form.password} onChange={handleChange} required={!form.id} />
        </div>
        <div className="col-md-2">
          <select name="rol" className="form-select" value={form.rol} onChange={handleChange}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <div className="col-md-2 d-flex gap-2">
          <button className="btn btn-primary w-100" type="submit">
            {form.id ? "Actualizar" : "Crear"}
          </button>
          {form.id && (
            <button className="btn btn-secondary" type="button" onClick={() => setForm(vacio)}>
              X
            </button>
          )}
        </div>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr><th>ID</th><th>Nombre</th><th>Correo</th><th>Rol</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.rol}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => editar(u)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => eliminar(u.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </LayoutPrincipal>
  );
}