import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcss from 'postcss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), postcss()],
  resolve: {
    alias: {
      path: 'path-browserify', 
      'source-map-js': 'source-map', 
      url: 'url-polyfill', 
      fs: 'fs-web', 
    },
  },
})
