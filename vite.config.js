import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'
import * as path from 'path'
import manifest from './manifest.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest,
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@' : path.resolve(__dirname, './src'),
      '@router' : path.resolve(__dirname, './src/router'),
      '@layouts' : path.resolve(__dirname, './src/layouts'),
      '@pages' : path.resolve(__dirname, './src/pages'),
      '@components' : path.resolve(__dirname, './src/components'),
      '@store' : path.resolve(__dirname, './src/store'),
      '@theme' : path.resolve(__dirname, './src/theme'),
      '@hooks' : path.resolve(__dirname, './src/hooks'),
      '@utils' : path.resolve(__dirname, './src/utils'),
      '@styles' : path.resolve(__dirname, './src/styles'),
      '@assets' : path.resolve(__dirname, './src/assets'),
      '@images' : path.resolve(__dirname, './src/assets/images'),
    }
  }
})
