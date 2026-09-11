import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  base: mode === 'pages' ? '/demos/200ms/' : '/',
  plugins: [react()],
  server: { port: 5173 },
}))
