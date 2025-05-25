import { useEffect, useState } from "react"
import "../styles/ProductosContainer.css"
import Card from "./Card"

function ProductosDestacados({functionCarrito}) {
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://681848795a4b07b9d1ce713a.mockapi.io/productos')
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                console.log(datos)
                // Mezclar el array y tomar 3 productos aleatorios
                const productosAleatorios = mezclarArray(datos).slice(0, 3)
                setProductos(productosAleatorios)
                setCargando(false);
            })
            .catch((error) => {
                console.log("Error", error)
                setError('Hubo un problema al cargar los productos.');
                setCargando(false);
            });
    }, []);

    // Función para mezclar un array (algoritmo Fisher-Yates) Claramente generado por la IA
    const mezclarArray = (array) => {
        const nuevoArray = [...array]
        for (let i = nuevoArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [nuevoArray[i], nuevoArray[j]] = [nuevoArray[j], nuevoArray[i]];
        }
        return nuevoArray
    }

    if (cargando) {
        return <p>Cargando productos destacados...</p>;
    } else if (error) {
        return <p>{error}</p>;
    } else {
        return(
            <div className="productos-conteiner">
                {productos.map((producto) => (
                    <Card
                        key={producto.id}
                        producto={producto}
                        functionCarrito={functionCarrito}
                    />
                ))}
            </div>
        )
    }
}

export default ProductosDestacados