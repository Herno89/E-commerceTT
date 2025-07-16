import "../styles/Footer.css";
import { Container } from "react-bootstrap";

function Footer() {
    return (
        <footer className="bg-dark text-white py-3 mt-auto">
            <Container className="text-center">
                <p className="mb-0">&copy; 2025 - E-commerce Random</p>
            </Container>
        </footer>
    );
}

export default Footer;