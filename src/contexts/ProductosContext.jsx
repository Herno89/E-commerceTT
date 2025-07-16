import React, { createContext, useState, useContext } from 'react';
import { dispararSweetBasico } from '../assets/SweetAlert';

const ProductosContext = createContext();

export function ProductosProvider({ children }) {
    const [productos, setProductos] = useState([]);
    const [productoEncontrado, setProductoEncontrado] = useState(null);
    const [productosOriginales, setProductosOriginales] = useState([]);
    
    function obtenerProductos() {
        return new Promise((resolve, reject) => {
            fetch('https://681848795a4b07b9d1ce713a.mockapi.io/productos')
                .then((respuesta) => {
                    if (!respuesta.ok) {
                        throw new Error('Error al obtener productos');
                    }
                    return respuesta.json();
                })
                .then((datos) => {
                    setProductos(datos);
                    setProductosOriginales(datos);
                    resolve(datos);
                })
                .catch((error) => {
                    console.error("Error:", error);
                    reject('Hubo un problema al cargar los productos.');
                });
        });
    }

    const agregarProducto = async (producto) => {
        return new Promise(async (resolve, reject) => {
            try {
                const respuesta = await fetch('https://681848795a4b07b9d1ce713a.mockapi.io/productos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(producto),
                });
            
                if (!respuesta.ok) {
                    throw new Error('Error al agregar el producto.');
                }
                
                const data = await respuesta.json();
                console.log('Producto agregado:', data);
                resolve(data);
            } catch (error) {
                console.error(error.message);
                reject("Hubo un problema al agregar el producto.");
            }
        });
    };

    function obtenerProducto(id) {
        return new Promise((resolve, reject) => {
            if (!id) {
                reject("ID no proporcionado");
                return;
            }
            
            fetch(`https://681848795a4b07b9d1ce713a.mockapi.io/productos/${id}`)
                .then(res => {
                    if (!res.ok) throw new Error("Producto no encontrado");
                    return res.json();
                })
                .then(producto => {
                    setProductoEncontrado(producto);
                    resolve(producto);
                })
                .catch(err => {
                    console.error("Error:", err);
                    reject(err.message || "Hubo un error al obtener el producto");
                });
        });
    }

    function editarProducto(producto) {
        return new Promise(async(resolve, reject) => {
            try {
                if (!producto?.id) {
                    throw new Error('ID de producto no proporcionado');
                }
                
                const respuesta = await fetch(`https://681848795a4b07b9d1ce713a.mockapi.io/productos/${producto.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(producto),
                });
                
                if (!respuesta.ok) {
                    throw new Error('Error al actualizar el producto.');
                }
                
                const data = await respuesta.json();
                resolve(data);
            } catch (error) {
                console.error(error.message);
                reject(error);
            }
        });
    }

    const eliminarProducto = async (id) => {
        return new Promise(async (resolve, reject) => {

            try {
                const respuesta = await fetch(`https://681848795a4b07b9d1ce713a.mockapi.io/productos/${id}`, {
                    method: 'DELETE',
                });
                
                if (!respuesta.ok) throw new Error('Error al eliminar');
                
                console.log('Producto eliminado correctamente.');
                 dispararSweetBasico(
                   "Eliminado correctamente.",
                   "",
                   "success",
                   "Cerrar"
                 );
                resolve();
            } catch (error) {
                console.error(error.message);
                reject(error);
            }
        });
    };

    function buscarProductos(busqueda) {
        try {
            if (!busqueda?.trim()) {
                setProductos(productosOriginales);
                return;
            }
            
            const termino = busqueda.toLowerCase();
            const productosFiltrados = productosOriginales.filter(producto => 
                ['nombre', 'description', 'category', 'name']
                    .some(prop => producto?.[prop]?.toLowerCase()?.includes(termino))
            );
            
            setProductos(productosFiltrados);
        } catch (error) {
            console.error("Error en buscarProductos:", error);
            setProductos(productosOriginales);
        }
    }

    return (
        <ProductosContext.Provider value={{ 
            obtenerProductos, 
            productos, 
            agregarProducto, 
            obtenerProducto, 
            productoEncontrado, 
            editarProducto, 
            eliminarProducto, 
            buscarProductos 
        }}>
            {children}
        </ProductosContext.Provider> 
    );
}

export const useProductosContext = () => useContext(ProductosContext);