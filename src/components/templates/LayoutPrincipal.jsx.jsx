import { Outlet } from 'react-router-dom'
import NavBar from '../organisms/NavBar'
import Footer from '../organisms/Footer'

export default function LayoutPrincipal() {
  return (
    <>
      <header className="bg-vet text-white text-center py-4">
        <h1 className="h2 mb-1">Veterinaria San Marcos</h1>
        <p className="mb-0">Cuidado ideal para tu mascota</p>
        <NavBar />
      </header>

      <main className="container my-4">
        <Outlet />
      </main>

      <Footer />
    </>
  )
}