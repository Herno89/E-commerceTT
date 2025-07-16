import { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { 
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  FloatingLabel,
  Spinner,
  Alert
} from "react-bootstrap";
import { useProductosContext } from "../contexts/ProductosContext";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { useAuthContext } from "../contexts/AuthContext";

export default function FormularioEdicion() {
  const { admin } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const { obtenerProducto, productoEncontrado, editarProducto } = useProductosContext();
  const [producto, setProducto] = useState({
    name: '',
    price: '',
    description: '',
    imagen: ''
  });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);

  // Redirigir si no es admin
  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  // Cargar producto al montar el componente
  useEffect(() => {
    const cargarProducto = async () => {
      try {
        await obtenerProducto(id);
        setCargando(false);
      } catch (error) {
        setError(error === "Producto no encontrado" 
          ? "Producto no encontrado" 
          : "Hubo un error al obtener el producto.");
        setCargando(false);
      }
    };

    cargarProducto();
  }, [id]);

  // Actualizar estado cuando productoEncontrado cambie
  useEffect(() => {
    if (productoEncontrado) {
      setProducto(productoEncontrado);
    }
  }, [productoEncontrado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validarFormulario = () => {
    if (!producto.name.trim()) return "El nombre es obligatorio.";
    if (!producto.price || producto.price <= 0) return "El precio debe ser mayor a 0.";
    if (!producto.description.trim() || producto.description.length < 10) {
      return "La descripción debe tener al menos 10 caracteres.";
    }
    if (!producto.imagen.trim()) return "La URL de la imagen no debe estar vacía";
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true);
    
    const validacion = validarFormulario();
    if (validacion !== true) {
      dispararSweetBasico("Error en la validación","", validacion, "error");
      return;
    }

    try {
      await editarProducto(producto);
      dispararSweetBasico(
        "Producto actualizado", "","success","Cerrar"
      );
      navigate(`/productos/${id}`); // Redirige a la vista del producto después de editar
    } catch (error) {
      dispararSweetBasico(
        "Error al actualizar", "Hubo un problema al actualizar el producto: ","error", "Cerrar"
      );
    }
  };

  if (cargando) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">
          {error}
          <div className="mt-3">
            <Button variant="outline-danger" onClick={() => navigate('/admin')}>
              Volver al panel
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h3 className="mb-0">Editar Producto</h3>
            </Card.Header>
            
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <FloatingLabel controlId="name" label="Nombre del producto" className="mb-3">
                  <Form.Control
                    type="text"
                    name="name"
                    value={producto.name}
                    onChange={handleChange}
                    required
                    placeholder="Nombre del producto"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingresa un nombre válido
                  </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel controlId="imagen" label="URL de la imagen" className="mb-3">
                  <Form.Control
                    type="text"
                    name="imagen"
                    value={producto.imagen}
                    onChange={handleChange}
                    required
                    placeholder="URL de la imagen"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingresa una URL válida
                  </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel controlId="price" label="Precio ($)" className="mb-3">
                  <Form.Control
                    type="number"
                    name="price"
                    value={producto.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="Precio"
                  />
                  <Form.Control.Feedback type="invalid">
                    El precio debe ser mayor a 0
                  </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel controlId="description" label="Descripción" className="mb-4">
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={producto.description}
                    onChange={handleChange}
                    required
                    minLength="10"
                    style={{ height: '150px' }}
                    placeholder="Descripción del producto"
                  />
                  <Form.Control.Feedback type="invalid">
                    La descripción debe tener al menos 10 caracteres
                  </Form.Control.Feedback>
                  <Form.Text muted>
                    Mínimo 10 caracteres
                  </Form.Text>
                </FloatingLabel>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" size="lg">
                    Actualizar Producto
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => navigate(`/productos/${id}`)} 
                    size="lg"
                  >
                    Cancelar
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