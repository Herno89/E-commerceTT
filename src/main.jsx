import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CarritoProvider } from './contexts/CarritoContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ProductosProvider } from './contexts/ProductosContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductosProvider>
    <AuthProvider>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </AuthProvider>
    </ProductosProvider>
  </StrictMode>,
)
