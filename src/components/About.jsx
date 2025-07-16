import "../styles/About.css";
import { Container, Button } from 'react-bootstrap';

function About() {
    return (
      <Container className="About-Conteiner p-4">
        <h2>Sobre Nosotros</h2>
        <p>
          Bienvenido a nuestra tienda online. Nos especializamos en ofrecer
          productos de alta calidad a precios accesibles. Nuestro objetivo es
          brindarte una experiencia de compra simple, rápida y segura.
        </p>
        <p>
          Ya sea que estés buscando tecnología, ropa, comida, accesorios o más, en
          nuestro e-commerce vas a encontrar cosas que no necesitás.
        </p>
        

        <Button 
          variant="primary"
          className="contact-button"
          onClick={() => window.location.href = "/contacto"}
        >
          Contáctanos
        </Button>
      </Container>
    );
}

export default About;