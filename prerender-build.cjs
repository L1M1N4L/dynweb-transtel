/**
 * prerender-build.cjs
 * Runs vite build + prerendering so every route gets real static HTML
 * that search engine crawlers can read without executing JavaScript.
 *
 * Run with: npm run build:prod
 *
 * Routes prerendered:
 *  / /about /product /solution /solution/hospitality /solution/healthcare
 *  /solution/corporate /solution/government /solution/education
 *  /contact /support /help
 */
const { build } = require('vite')
const vitePrerender = require('vite-plugin-prerender')
const react = require('@vitejs/plugin-react')
const tailwindcss = require('@tailwindcss/vite')
const path = require('path')

;(async () => {
  await build({
    configFile: false,
    plugins: [
      react.default ? react.default() : react(),
      tailwindcss.default ? tailwindcss.default() : tailwindcss(),
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
          renderAfterDocumentEvent: 'render-event',
        }),
      }),
    ],
    build: {
      outDir: 'dist',
    },
  })
})()
