import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TablaReporteServicios from './TablaReporteServicios'

describe('TablaReporteServicios', () => {
  it('muestra el servicio, la cantidad y los ingresos con formato', () => {
    render(<TablaReporteServicios filas={[{ servicioNombre: 'Vacunación', cantidad: 4, ingresos: 48000 }]} />)

    expect(screen.getByText('Vacunación')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('$48.000')).toBeInTheDocument()
  })

  it('muestra un aviso si no hay solicitudes', () => {
    render(<TablaReporteServicios filas={[]} />)
    expect(screen.getByText('Aún no hay solicitudes para reportar.')).toBeInTheDocument()
  })
})