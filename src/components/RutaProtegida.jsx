import { Navigate } from "react-router-dom";

export default function RutaProtegida({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" replace />;
}