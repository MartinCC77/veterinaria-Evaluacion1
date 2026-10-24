import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ComprobanteCita from './ComprobanteCita'

const cita = {
  id: 7,
  estado: 'confirmada',
  dueno: 'Juan Pérez',
  correo: 'juan@correo.cl',
  mascota: 'Cachulo',
  especie: 'perro',
  servicioNombre: 'Consulta general',
  fecha: '2026-10-20',
  hora: '10:00',
  motivo: 'Control de rutina',
  urgencia: true,
  precioFinal: 28000,
}

describe('ComprobanteCita', () => {
  it('muestra el número de solicitud y los datos de la cita', () => {
    render(<ComprobanteCita cita={cita} />)

    expect(screen.getByText('Comprobante de solicitud N° 7')).toBeInTheDocument()
    expect(screen.getByText(/Cachulo/)).toBeInTheDocument()
    expect(screen.getByText('Consulta general')).toBeInTheDocument()
  })

  it('muestra el total con formato de precio', () => {
    render(<ComprobanteCita cita={cita} />)
    expect(screen.getByText('$28.000')).toBeInTheDocument()
  })

  it('indica si la cita fue de urgencia fuera de horario', () => {
    const { rerender } = render(<ComprobanteCita cita={cita} />)
    expect(screen.getByText(/Sí \(recargo/)).toBeInTheDocument()

    rerender(<ComprobanteCita cita={{ ...cita, urgencia: false }} />)
    expect(screen.getByText('No')).toBeInTheDocument()
  })
})