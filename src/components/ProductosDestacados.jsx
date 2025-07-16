import { useEffect, useState } from "react"
import "../styles/ProductosContainer.css"
import Card from "./Card"
import { Carousel, Container, Row, Col } from "react-bootstrap";

function ProductosDestacados({functionCarrito}) {
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [itemsPerSlide, setItemsPerSlide] = useState(3); // Valor inicial

    useEffect(() => {
        fetch('https://681848795a4b07b9d1ce713a.mockapi.io/productos')
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                const productosAleatorios = mezclarArray(datos).slice(0, 6)
                setProductos(productosAleatorios)
                setCargando(false);
            })
            .catch((error) => {
                console.log("Error", error)
                setError('Hubo un problema al cargar los productos.');
                setCargando(false);
            });

        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerSlide(1);
            } else if (window.innerWidth < 992) {
                setItemsPerSlide(2);
            } else {
                setItemsPerSlide(3);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Función para mezclar un array (algoritmo Fisher-Yates)
    const mezclarArray = (array) => {
        const nuevoArray = [...array]
        for (let i = nuevoArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [nuevoArray[i], nuevoArray[j]] = [nuevoArray[j], nuevoArray[i]];
        }
        return nuevoArray
    }

    // Función para dividir los productos en grupos para el carrusel
    const chunkArray = (array, size) => {
        const chunkedArr = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    }

    if (cargando) {
        return <div className="text-center my-5"><p>Cargando productos destacados...</p></div>;
    } else if (error) {
        return <div className="text-center my-5"><p>{error}</p></div>;
    } else {
        const productosEnGrupos = chunkArray(productos, itemsPerSlide);
        
        return(
            <Container className="productos-destacados-container my-5">
                <h2 className="text-center mb-4">Productos Destacados</h2>
                <Carousel 
                    indicators={productosEnGrupos.length > 1} 
                    interval={3000} 
                    pause="hover"
                    controls={productosEnGrupos.length > 1}
                >
                    {productosEnGrupos.map((grupo, index) => (
                        <Carousel.Item key={index}>
                            <Row className="justify-content-center">
                                {grupo.map((producto) => (
                                    <Col 
                                        key={producto.id} 
                                        xs={12} 
                                        md={itemsPerSlide === 2 ? 6 : 4} 
                                        lg={itemsPerSlide === 1 ? 12 : itemsPerSlide === 2 ? 6 : 4}
                                        className="mb-3"
                                    >
                                        <Card
                                            producto={producto}
                                            functionCarrito={functionCarrito}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        )
    }
}

export default ProductosDestacados