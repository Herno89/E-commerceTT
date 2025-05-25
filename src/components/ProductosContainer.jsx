import { useEffect, useState } from "react"
import "../styles/ProductosContainer.css"
import Card from "./Card"

function ProductosContainer({functionCarrito}){
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);


    //Se usa un efecto para que lo cargue una sola vez por eso el array vacio al final []
    {useEffect(() => {
        fetch('https://681848795a4b07b9d1ce713a.mockapi.io/productos')
            .then((respuesta) =>
                respuesta.json()
            )
            // aca creo que agarra los datos de respuesta.json (un array de objetos)
            .then((datos) => {
                console.log(datos)
                setProductos(datos)
                setCargando(false);
            })
            .catch((error) => {
                console.log("Error", error)
                setError('Hubo un problema al cargar los productos.');
                setCargando(false);
            });
    }, []);}

    //muestra cargando antes de que lleguen los productos

    if (cargando) {
        return <p>Cargando productos...</p>;
    }else if (error){
        return <p>{error}</p>;
    }else{
        return(
            <div className="productos-conteiner">
                {productos.map((producto) => (
                    <Card
                        producto={producto}
                    />
                ))}
            </div>
        )
    }

    
}

export default ProductosContainer

