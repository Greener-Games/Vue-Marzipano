import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@greener-games/vue-marzipano/style.css': path.resolve(__dirname, './plugins/@greener-games/vue-marzipano/src/style.scss'),
      '@greener-games/vue-marzipano': path.resolve(__dirname, './plugins/@greener-games/vue-marzipano/src/index.ts'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
})
