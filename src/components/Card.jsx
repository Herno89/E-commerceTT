import { Card as BootstrapCard, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function Card({ producto }) {
    return (
        <BootstrapCard className="h-100 shadow-sm">
            <Link to={`/productos/${producto.id}`}>
                <BootstrapCard.Img 
                    variant="top" 
                    src={producto.imagen} 
                    style={{ 
                        height: '200px', 
                        objectFit: 'contain', 
                        padding: '10px' 
                    }} 
                />
            </Link>
            <BootstrapCard.Body className="d-flex flex-column">
                <BootstrapCard.Title>{producto.name}</BootstrapCard.Title>
                <BootstrapCard.Text className="fw-bold text-primary my-2">
                    ${producto.price}
                </BootstrapCard.Text>
                <Link to={`/productos/${producto.id}`} className="mt-auto">
                    <Button variant="primary" className="w-100">
                        Ver detalles
                    </Button>
                </Link>
            </BootstrapCard.Body>
        </BootstrapCard>
    );
}

Card.propTypes = {
    producto: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        imagen: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired
};

export default Card;