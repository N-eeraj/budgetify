import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174
  },
  resolve: {
    alias: {
      '@' : path.resolve(__dirname, './src'),
      '@router' : path.resolve(__dirname, './src/router'),
      '@layout' : path.resolve(__dirname, './src/layouts'),
      '@page' : path.resolve(__dirname, './src/pages'),
      '@component' : path.resolve(__dirname, './src/components'),
      '@store' : path.resolve(__dirname, './src/store'),
      '@theme' : path.resolve(__dirname, './src/theme'),
      '@hooks' : path.resolve(__dirname, './src/hooks'),
      '@utils' : path.resolve(__dirname, './src/utils'),
      '@style' : path.resolve(__dirname, './src/styles'),
      '@asset' : path.resolve(__dirname, './src/assets'),
      '@image' : path.resolve(__dirname, './src/assets/images'),
    }
  }
})
