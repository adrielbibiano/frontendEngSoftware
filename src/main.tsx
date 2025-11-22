import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { setupMock } from './api/mock'

// setup axios mock for dev/demo. You can disable mocks by setting
// VITE_USE_MOCK=false in your .env (or .env.local) when running Vite.
const useMock = import.meta.env.DEV && (import.meta.env.VITE_USE_MOCK ?? 'true') === 'true'
if (useMock) {
  setupMock()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
