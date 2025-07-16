import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { Button, Container, Row, Col } from "react-bootstrap";

export default function Admin() {
  const { admin } = useAuthContext();
  const navigate = useNavigate();

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4">Panel de Administración</h1>
      
      <Row className="g-3">
        <Col md={4}>
          <div className="d-grid">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate("/admin/agregarproducto")}
            >
              Agregar Producto
            </Button>
          </div>
        </Col>
        
        <Col md={4}>
          <div className="d-grid">
            <Button 
              variant="warning" 
              size="lg"
              onClick={() => navigate("/productos")}
            >
              Editar Productos
            </Button>
          </div>
        </Col>
        
        <Col md={4}>
          <div className="d-grid">
            <Button 
              variant="danger" 
              size="lg"
              onClick={() => navigate("/productos")}
            >
              Eliminar Productos
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}