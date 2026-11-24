import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutPrincipal from "../components/templates/LayoutPrincipal";
import { useTituloPagina } from "../hooks/useTituloPagina";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useTituloPagina("Iniciar sesión");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("usuario", JSON.stringify(res.data.usuario));
      navigate("/usuarios");
    } catch (err) {
      setError(err.response?.data?.mensaje || "No se pudo conectar con el servidor");
    }
  };

  return (
    <LayoutPrincipal>
      <div className="mx-auto" style={{ maxWidth: 420 }}>
        <h1 className="h2 text-primary mb-4 text-center">Iniciar sesión</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">Entrar</button>
        </form>
      </div>
    </LayoutPrincipal>
  );
}