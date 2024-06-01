import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server:{
  //   host:"192.168.15.109" || "192.168.7.113"
  // },
  plugins: [react()],
})
