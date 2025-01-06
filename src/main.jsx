import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
import { HelmetProvider } from 'react-helmet-async';
=======
>>>>>>> 148eca0285ff5beb08553773aba47b4f44263d21
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
<<<<<<< HEAD
    <HelmetProvider>
      <App />
    </HelmetProvider>
=======
    <App />
>>>>>>> 148eca0285ff5beb08553773aba47b4f44263d21
  </StrictMode>,
)
