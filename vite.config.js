import react from '@vitejs/plugin-react'
<<<<<<< HEAD
<<<<<<< Updated upstream
import { defineConfig } from 'vitest/config'
=======
import { defineConfig } from 'vitest/config' 

>>>>>>> Stashed changes
=======
import { defineConfig } from 'vitest/config' 

>>>>>>> b5cec22 (Carpetas nuevas)
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', 
    globals: true, 
    setupFiles: './src/setupTests.js', 
    coverage: {
      provider: 'v8',
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
      // carpetas que se miden en el reporte de cobertura
>>>>>>> b5cec22 (Carpetas nuevas)
      include: ['src/utils/**', 'src/services/**', 'src/components/**'],
=======
      include: ['src/utils/', 'src/services/', 'src/components/**'],
>>>>>>> Stashed changes
    },
  },
})