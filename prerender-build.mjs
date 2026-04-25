/**
 * prerender-build.mjs
 * Runs vite build + prerendering so every route gets real static HTML
 * that search engine crawlers can read without executing JavaScript.
 *
 * Run with: npm run build:prod
 */
import { build } from 'vite'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import path from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const require = createRequire(import.meta.url)

// vite-plugin-prerender is CJS — load it via require
const vitePrerender = require('vite-plugin-prerender')

await build({
  configFile: false,
  plugins: [
    react(),
    tailwindcss(),
    vitePrerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: [
        '/',
        '/about',
        '/product',
        '/solution',
        '/solution/hospitality',
        '/solution/healthcare',
        '/solution/corporate',
        '/solution/government',
        '/solution/education',
        '/contact',
        '/support',
        '/help',
      ],
      renderer: new vitePrerender.PuppeteerRenderer({
        injectProperty: '__PRERENDER_INJECTED',
        inject: { prerendered: true },
        renderAfterTime: 4000, // wait 4s for React + Firebase to settle, then snapshot
      }),
    }),
  ],
  build: {
    outDir: 'dist',
  },
})
