import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config' 

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', 
    globals: true, 
    setupFiles: './src/setupTests.js', 
    coverage: {
      provider: 'v8',
      // carpetas que se miden en el reporte de cobertura
      include: ['src/utils/**', 'src/services/**', 'src/components/**'],
    },
  },
})