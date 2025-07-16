import React from "react";
import { Button } from "react-bootstrap";
import "../styles/Carrito.css";

function CarritoCard({ producto, funcionBorrar }) {
  function borrarDelCarrito() {
    funcionBorrar(producto.id);
  }

  // Convert price to number and format safely
  const formatPrice = (price) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : Number(price);
    return isNaN(numericPrice) ? '0.00' : numericPrice.toFixed(2);
  };

  const unitPrice = formatPrice(producto.price);
  const subtotal = formatPrice(producto.cantidad * (typeof producto.price === 'string' ? parseFloat(producto.price) : producto.price));

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img 
            src={producto.imagen} 
            alt={producto.name}
            className="carrito-image me-3"
            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
          />
          <span className="carrito-producto">{producto.name}</span>
        </div>
      </td>
      <td className="descripcion-carrito">
        {producto.description || "-"}
      </td>
      <td className="text-center">
        {producto.cantidad}
      </td>
      <td className="text-end">
        ${unitPrice}
      </td>
      <td className="text-end">
        ${subtotal}
      </td>
      <td className="text-center">
        <Button
          variant="outline-danger"
          size="sm"
          onClick={borrarDelCarrito}
          title="Eliminar producto"
        >
          <i className="bi bi-trash">x</i>
        </Button>
      </td>
    </tr>
  );
}

export default CarritoCard;