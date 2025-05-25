import { Link } from "react-router-dom";
import "../styles/About.css";

function About() {
    return (
      <section className="About-Conteiner">
        <h2>Sobre Nosotros</h2>
        <p>
          Bienvenido a nuestra tienda online. Nos especializamos en ofrecer
          productos de alta calidad a precios accesibles. Nuestro objetivo es
          brindarte una experiencia de compra simple, rápida y segura.
        </p>
        <p>
          Ya sea que estés buscando tecnología, ropa, accesorios o más, en
          nuestro e-commerce vas a encontrar lo que necesitás.
        </p>
        
        {/* Botón de contacto */}
        <button 
        className="contact-button"
        onClick={() => window.location.href = "/contacto"}
        >
        Contáctanos
        </button>
      </section>
    );
}

export default About;