import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import './index.css'
import App from './App.jsx'

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)

// Signal to vite-plugin-prerender that the app is fully rendered.
// We defer until after React's first paint so Puppeteer catches the event.
setTimeout(() => {
  requestAnimationFrame(() => {
    document.dispatchEvent(new Event('render-event'))
  })
}, 200)

