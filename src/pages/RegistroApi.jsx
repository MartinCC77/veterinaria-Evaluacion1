import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutPrincipal from "../components/templates/LayoutPrincipal";
import { useTituloPagina } from "../hooks/useTituloPagina";
import api from "../api";

export default function RegistroApi() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useTituloPagina("Registrarse");

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/register", { nombre, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.mensaje || "No se pudo registrar");
    }
  };

  return (
    <LayoutPrincipal>
      <div className="mx-auto" style={{ maxWidth: 420 }}>
        <h1 className="h2 text-primary mb-4 text-center">Registrarse</h1>
        <form onSubmit={handleRegistro}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input className="form-control" value={nombre}
              onChange={(e) => setNombre(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input type="email" className="form-control" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">Crear cuenta</button>
        </form>
      </div>
    </LayoutPrincipal>
  );
}