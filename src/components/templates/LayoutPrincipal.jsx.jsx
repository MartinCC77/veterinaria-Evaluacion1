import { Outlet } from 'react-router-dom'
import NavBar from '../organisms/NavBar'
import Footer from '../organisms/Footer'

export default function LayoutPrincipal() {
  return (
    <>
      <header>
        <h1>Veterinaria San Marcos</h1>
        <p>Cuidado ideal para tu mascota</p>
        <NavBar />
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  )
}