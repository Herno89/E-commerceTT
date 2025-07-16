import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { 
  Container, 
  Row, 
  Col, 
  Image, 
  Button, 
  Alert, 
  Spinner,
  ButtonGroup,
  Card
} from "react-bootstrap";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";

function ProductoDetalle() {
  const navegar = useNavigate();
  const { admin } = useAuthContext();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { productoEncontrado, obtenerProducto, eliminarProducto } = useProductosContext();
  const { id } = useParams();
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProducto(id)
      .then(() => setCargando(false))
      .catch((error) => {
        if(error === "Producto no encontrado") {
          setError("Producto no encontrado");
        } else if(error === "Hubo un error al obtener el producto.") {
          setError("Hubo un error al obtener el producto.");
        }
        setCargando(false);
      });
  }, [id]);

  function dispararEliminar() {
    eliminarProducto(id)
      .then(() => navegar("/productos"))
      .catch((error) => {
        dispararSweetBasico("Hubo un problema al eliminar el producto.","", error, "cerrar");
      });
  }

  function funcionCarrito() {
    if (cantidad < 1) return;
    dispararSweetBasico(
      "Producto Agregado", 
      "El producto fue agregado al carrito con éxito", 
      "success", 
      "Cerrar"
    );
    agregarAlCarrito({ ...productoEncontrado, cantidad });
  }

  function sumarContador() {
    setCantidad(cantidad + 1);
  }

  function restarContador() {
    if (cantidad > 1) setCantidad(cantidad - 1);
  }

  if (cargando) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando producto...</span>
        </Spinner>
        <p className="mt-2">Cargando producto...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => navegar("/productos")}>
          Volver a productos
        </Button>
      </Container>
    );
  }

  if (!productoEncontrado) return null;

  return (
    <Container className="my-5">
      <Card className="shadow-sm">
        <Row className="g-0">
          <Col md={6}>
            <Image
              fluid
              src={productoEncontrado.imagen}
              alt={productoEncontrado.name}
              className="p-3"
              style={{ maxHeight: "500px", objectFit: "contain" }}
            />
          </Col>
          <Col md={6}>
            <Card.Body className="h-100 d-flex flex-column">
              <Card.Title as="h2" className="mb-3">{productoEncontrado.name}</Card.Title>
              <Card.Text className="mb-4">{productoEncontrado.description}</Card.Text>
              <Card.Text className="h4 text-primary mb-4">
                ${productoEncontrado.price}
              </Card.Text>
              
              <div className="mb-4">
                <h5>Cantidad:</h5>
                <ButtonGroup>
                  <Button variant="outline-primary" onClick={restarContador}>-</Button>
                  <Button variant="light" disabled style={{ minWidth: "50px" }}>
                    {cantidad}
                  </Button>
                  <Button variant="outline-primary" onClick={sumarContador}>+</Button>
                </ButtonGroup>
              </div>

              <div className="mt-auto d-grid gap-2">
                {admin ? (
                  <>
                    <Link to={`/admin/editarProducto/${id}`} className="btn btn-warning">
                      Editar producto
                    </Link>
                    <Button variant="danger" onClick={dispararEliminar}>
                      Eliminar Producto
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" size="lg" onClick={funcionCarrito}>
                    Agregar al carrito
                  </Button>
                )}
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default ProductoDetalle;