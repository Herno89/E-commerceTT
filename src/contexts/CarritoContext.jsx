import React, { createContext, useState } from "react";
import { dispararSweetBasico } from "../assets/SweetAlert";

export const CarritoContext = createContext();
export function CarritoProvider({ children }) {
  
  const [productosCarrito, setProductosCarrito] = useState([]);
  
  
  const agregarAlCarrito = (producto) => {
    const existe = productosCarrito.find((p) => p.id === producto.id);
    console.log(existe);
    if (existe) {
      const carritoActualizado = productosCarrito.map((p) => {
        if (p.id === producto.id) {
          const productoActualizado = {
            ...p,
            cantidad: p.cantidad + producto.cantidad,
          };
          return productoActualizado;
        } else {
          return p;
        }
      });
      setProductosCarrito(carritoActualizado);
    } else {
      const nuevoCarrito = [...productosCarrito, producto];
      setProductosCarrito(nuevoCarrito);
    }
  };


  const vaciarCarrito = () => {
    setProductosCarrito([]);
  }

  function borrarProductoCarrito(id){
    console.log(id)
    const nuevoCarrito = productosCarrito.filter((p) => p.id !== id);
    setProductosCarrito(nuevoCarrito);
    dispararSweetBasico(
      "Producto eliminado del carrito",
      "",
      "success",
      "Cerrar"
    );
  }

  return (
    <CarritoContext.Provider
      value={{ productosCarrito, agregarAlCarrito, vaciarCarrito, borrarProductoCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
