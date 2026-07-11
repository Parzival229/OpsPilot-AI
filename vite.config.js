import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,

    // ── Dev proxy ───────────────────────────────────────────────────────
    // The browser cannot call IBM IAM or watsonx directly (CORS).
    // Vite forwards /api/iam  → https://iam.cloud.ibm.com
    //               /api/wx   → your watsonx deployment (VITE_WATSONX_ENDPOINT)
    // In production, replace this with a real backend proxy (Node/Express/nginx).
    proxy: {
      '/api/iam': {
        target: 'https://iam.cloud.ibm.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/iam/, ''),
        secure: true,
      },
      '/api/wx': {
        target: 'https://us-south.ml.cloud.ibm.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/wx/, ''),
        secure: true,
      },
    },
  },
})
