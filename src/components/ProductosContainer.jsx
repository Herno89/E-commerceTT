import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert, Form } from "react-bootstrap";
import { useProductosContext } from "../contexts/ProductosContext";
import { Helmet } from "react-helmet";
import Card from "./Card";

function ProductosContainer({}) {
    const { productos, obtenerProductos, buscarProductos } = useProductosContext();

    const productosPorPagina = 6; 
    const [paginaActual, setPaginaActual] = useState(1);
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productos.slice(indicePrimerProducto, indiceUltimoProducto);
    
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        obtenerProductos()
            .then(() => setCargando(false))
            .catch((error) => {
                setError('Hubo un problema al cargar los productos.');
                setCargando(false);
                console.error(error);
            });
    }, []);

    useEffect(() => {
        buscarProductos(busqueda);
    }, [busqueda]);
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

    if (cargando) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando productos...</span>
                </Spinner>
                <p className="mt-2">Cargando productos...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="my-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="my-4">
            <Helmet>
                <title>Productos | Mi Tienda</title>
                <meta name="description" content="Explora nuestra variedad de productos." />
            </Helmet>

            <Form.Group className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="Buscar productos..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    size="lg"
                />
            </Form.Group>

            {productosActuales.length === 0 ? (
                <Alert variant="info">No se encontraron productos</Alert>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {productosActuales.map((producto) => (
                        <Col key={producto.id}>
                            <Card producto={producto} />
                        </Col>
                    ))}
                </Row>
            )}
            <div className="d-flex justify-content-center my-4">
                {Array.from({ length: totalPaginas }, (_, index) => (
                <button
                    key={index + 1}
                    className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => cambiarPagina(index + 1)}
                >
                    {index + 1}
                </button>
                ))}
            </div>
        </Container>
    );
}

export default ProductosContainer;