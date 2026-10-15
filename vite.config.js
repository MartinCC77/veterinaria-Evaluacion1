import react from '@vitejs/plugin-react'
<<<<<<< Updated upstream
import { defineConfig } from 'vitest/config'
=======
import { defineConfig } from 'vitest/config' 

>>>>>>> Stashed changes
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', 
    globals: true, 
    setupFiles: './src/setupTests.js', 
    coverage: {
      provider: 'v8',
<<<<<<< Updated upstream
      include: ['src/utils/**', 'src/services/**', 'src/components/**'],
=======
      include: ['src/utils/', 'src/services/', 'src/components/**'],
>>>>>>> Stashed changes
    },
  },
})