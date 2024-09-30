import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'

const manifestForPlugin: Partial<VitePWAOptions> = {
  manifest: {
    name: 'My Wallet',
    short_name: 'My Wallet',
    description: 'Track your spendings.',
    theme_color: '#00785D',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait'
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)]
})
