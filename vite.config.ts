import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mockApiPlugin } from './src/mocks/mockApi'

export default defineConfig({
  plugins: [react(), mockApiPlugin()],
})
