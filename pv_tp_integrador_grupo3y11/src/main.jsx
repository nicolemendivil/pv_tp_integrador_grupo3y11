import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
// Punto de entrada de la aplicación React
// Se renderiza la app dentro del root del HTML
import { AdminProvider } from './context/AdminContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Proveedor del router para manejo de rutas en la app */}
    <BrowserRouter>
      {/* Contexto global para manejar autenticación del administrador */}
      <AdminProvider>
        {/* Componente principal de la aplicación */}
        <App />
      </AdminProvider>
    </BrowserRouter>
  </StrictMode>,
);
