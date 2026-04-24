import { defineConfig } from 'vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import stylexPlugin from '@stylexjs/unplugin'
import contentCollections from '@content-collections/vite'

export default defineConfig({
  server: {
    port: 3000,
    strictPort: true,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    contentCollections(),
    stylexPlugin.vite({
      dev: process.env.NODE_ENV !== 'production',
      useCSSLayers: true,
      runtimeInjection: process.env.NODE_ENV !== 'production',
      unstable_moduleResolution: {
        type: 'commonJS',
        rootDir: process.cwd(),
      },
    }),
    tanstackStart(),
    viteReact(),
  ],
})
