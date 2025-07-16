import { useContext } from "react";
import { Container, Button, Table, Alert, Badge, Row, Col, Card } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { CarritoContext } from "../contexts/CarritoContext.jsx";
import { useAuthContext } from "../contexts/AuthContext.jsx";
import CarritoCard from "./CarritoCard.jsx";
import { dispararSweetBasico } from "../assets/SweetAlert.js";

export default function Carrito() {
  const { user } = useAuthContext();
  const { productosCarrito, vaciarCarrito, borrarProductoCarrito } = useContext(CarritoContext);

  // Calcular total con conversión segura a número
  const total = productosCarrito.reduce(
    (subTotal, producto) => subTotal + (Number(producto.price) || 0) * (producto.cantidad || 1), 
    0
  );

  const generarRecibo = () => {
    // Validar que haya productos
    if (productosCarrito.length === 0) {
      alert("No hay productos en el carrito");
      return;
    }

    // Crear contenido del recibo
    let contenidoRecibo = `RECIBO DE COMPRA\n\n`;
    contenidoRecibo += `Cliente: ${user || 'Invitado'}\n`;
    contenidoRecibo += `Fecha: ${new Date().toLocaleDateString()}\n\n`;
    contenidoRecibo += `PRODUCTOS:\n`;
    
    productosCarrito.forEach((producto, index) => {
      const precio = Number(producto.price) || 0;
      const cantidad = producto.cantidad || 1;
      const nombre = producto.name || 'Producto sin nombre';
      
      contenidoRecibo += `${index + 1}. ${nombre} - `;
      contenidoRecibo += `Cant: ${cantidad} x `;
      contenidoRecibo += `$${precio.toFixed(2)} = `;
      contenidoRecibo += `$${(precio * cantidad).toFixed(2)}\n`;
    });
    
    contenidoRecibo += `\nTOTAL: $${total.toFixed(2)}\n\n`;
    contenidoRecibo += `¡Gracias por su compra!`;

    // Crear y descargar archivo
    try {
      const blob = new Blob([contenidoRecibo], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `recibo_${new Date().toISOString().slice(0, 10)}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Vaciar carrito después de descargar
      vaciarCarrito();
      dispararSweetBasico("Recibo generado", "", "success", "Confirmar");
    } catch (error) {
      console.error("Error al generar recibo:", error);
      dispararSweetBasico("Ocurrió un error al generar el recibo", "", "success", "Confirmar");
      
    }
  };

  if(!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container className="my-4">
      <h2 className="mb-4">Tu Carrito de Compras</h2>
      
      {productosCarrito.length > 0 ? (
        <>
          <div className="d-flex justify-content-end mb-3">
            <Button 
              variant="outline-danger" 
              onClick={vaciarCarrito}
              size="sm"
            >
              Vaciar Carrito
            </Button>
          </div>
          
          <Table responsive striped bordered hover className="align-middle">
            <thead className="table-dark">
              <tr>
                <th>Producto</th>
                <th>Descripción</th>
                <th className="text-center">Cantidad</th>
                <th className="text-end">Precio Unitario</th>
                <th className="text-end">Subtotal</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosCarrito.map((producto) => (
                <CarritoCard 
                  key={producto.id} 
                  producto={producto} 
                  funcionBorrar={borrarProductoCarrito} 
                />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} className="text-end fw-bold">Total:</td>
                <td className="text-end fw-bold">${total.toFixed(2)}</td>
                <td></td>
              </tr>
            </tfoot>
          </Table>
          
          <Row className="mt-4">
            <Col md={{ span: 4, offset: 8 }}>
              <Card className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Total a pagar:</h5>
                  <Badge bg="primary" pill className="fs-5">
                    ${total.toFixed(2)}
                  </Badge>
                </div>
                <Button 
                  variant="success" 
                  size="lg" 
                  className="w-100"
                  onClick={generarRecibo}
                >
                  Finalizar Compra
                </Button>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <Alert variant="info" className="text-center">
          <Alert.Heading>Tu carrito está vacío</Alert.Heading>
          <p>Agrega productos para comenzar a comprar</p>
          <Button variant="primary" href="/productos">
            Ver Productos
          </Button>
        </Alert>
      )}
    </Container>
  );
}