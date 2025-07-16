import { useEffect, useState } from 'react'
import Home from './layouts/Home'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav'
import ProductosContainer from './components/ProductosContainer';
import Carrito from './components/Carrito';
import About from './components/About';
import Contacto from './components/Contacto';
import ProductoDetalle from './components/ProductoDetalle';
import Admin from './components/Admin';
import ProductosDestacados from './components/ProductosDestacados';
import Footer from './components/Footer';
import FormularioProducto from './components/FormularioProducto';
import FormularioEdicion from './components/FormularioEdicion';
import { useAuthContext } from './contexts/AuthContext';
import LoginBootstrap from './components/LoginBootstrap';
import PerfilUsuario from './components/PerfilUsuario';

function App() {
  const {verificacionLog} = useAuthContext();
  
  useEffect(()=>{
    verificacionLog()
  },[])
 
    // rutas
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
       <main className="flex-grow-1">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginBootstrap />} />
          <Route path="/productos" element={<ProductosContainer />} />
          <Route path="/productosdestacados" element={<ProductosDestacados />}/>
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/productos/:id" element={<ProductoDetalle />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/agregarproducto" element={<FormularioProducto />}/>
          <Route path="/admin/editarproducto/:id" element={<FormularioEdicion />}/>
          <Route path="/perfil" element={<PerfilUsuario />} />
        </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
