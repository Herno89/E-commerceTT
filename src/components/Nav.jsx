import { Link } from "react-router-dom";
import "../styles/Nav.css"
function Nav({productosCarrito}) {
    return ( 
        <nav className="Nav-container">  
            <ul>  
                <li><Link to="/">Inicio</Link></li>  
                <li><Link to="/productos">Productos</Link></li>   
                <li><Link to="/nosotros">Nosotros</Link></li>  
                <li><Link to="/contacto">Contacto</Link></li>  
                <li><Link to="/carrito">Carrito <span>{productosCarrito.length > 0 ? productosCarrito.length : ""}</span></Link></li> 
                <li><Link to="/admin">Admin</Link></li> 
                <li><Link to="/login">Login</Link></li>  
            </ul>
        </nav>
    );  
}


export default Nav; 