import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import observerPlugin from "mobx-react-observer/babel-plugin"

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      react: fileURLToPath(new URL('./node_modules/react', import.meta.url)),
      'react-dom': fileURLToPath(new URL('./node_modules/react-dom', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['color-functions', 'global-builtin', 'import'],
      },
      sass: {
        silenceDeprecations: ['slash-div'],
      },
    },
  },
  plugins: [react({
    babel: {
      plugins: [
        observerPlugin()
      ],
    },
  })],
  define: {
    __APP_MODE__: JSON.stringify(mode),
  }
}));
