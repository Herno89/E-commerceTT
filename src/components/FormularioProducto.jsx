import React, { useState } from 'react'
import { 
  Form, 
  Button, 
  Container, 
  Row, 
  Col, 
  Alert, 
  Card,
  FloatingLabel 
} from 'react-bootstrap';
import { dispararSweetBasico } from '../assets/SweetAlert';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useProductosContext } from '../contexts/ProductosContext';

function FormularioProducto() {
  const { agregarProducto } = useProductosContext();
  const { admin } = useAuthContext();
  const [producto, setProducto] = useState({
    name: '',
    price: '',
    description: '',
    imagen: "",
  });
  const [validationError, setValidationError] = useState(null);

  const validarFormulario = () => {
    if (!producto.name.trim()) {
      return "El nombre es obligatorio.";
    }
    if (!producto.price || producto.price <= 0) {
      return "El precio debe ser mayor a 0.";
    }
    if (!producto.description.trim() || producto.description.length < 10) {
      return "La descripción debe tener al menos 10 caracteres.";
    }
    if (!producto.imagen.trim()) {
      return "La URL de la imagen no debe estar vacía";
    }
    return true;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
    // Limpiar el error cuando el usuario empieza a escribir
    if (validationError) setValidationError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validarForm = validarFormulario();
    
    if (validarForm === true) {
      agregarProducto(producto)
        .then((data) => {
          setProducto({ name: '', price: '', description: '', imagen: '' });
          dispararSweetBasico(
            "Producto agregado",
            "", 
            "success",
            "Cerrar"
          );
        })
        .catch((error) => {
          dispararSweetBasico(
            "Hubo un problema al agregar el producto.",
            error,
            "error",

            "Cerrar"
          );
        });
    } else {
      setValidationError(validarForm);
    }
  }

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                <h2>Agregar Producto</h2>
              </Card.Title>
              
              {validationError && (
                <Alert variant="danger" onClose={() => setValidationError(null)} dismissible>
                  {validationError}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <FloatingLabel controlId="name" label="Nombre del producto" className="mb-3">
                  <Form.Control
                    type="text"
                    name="name"
                    value={producto.name}
                    onChange={handleChange}
                    placeholder="Nombre del producto"
                    required
                  />
                </FloatingLabel>

                <FloatingLabel controlId="imagen" label="URL de la imagen" className="mb-3">
                  <Form.Control
                    type="text"
                    name="imagen"
                    value={producto.imagen}
                    onChange={handleChange}
                    placeholder="URL de la imagen"
                    required
                  />
                </FloatingLabel>

                <FloatingLabel controlId="price" label="Precio ($)" className="mb-3">
                  <Form.Control
                    type="number"
                    name="price"
                    value={producto.price}
                    onChange={handleChange}
                    placeholder="Precio"
                    min="0"
                    step="0.01"
                    required
                  />
                </FloatingLabel>

                <FloatingLabel controlId="description" label="Descripción" className="mb-4">
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={producto.description}
                    onChange={handleChange}
                    placeholder="Descripción del producto"
                    style={{ height: '100px' }}
                    required
                  />
                  <Form.Text muted>
                    Mínimo 10 caracteres
                  </Form.Text>
                </FloatingLabel>

                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">
                    Agregar Producto
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default FormularioProducto;