import { Navbar, Container, Badge, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CarritoContext } from "../contexts/CarritoContext";
import { useContext } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { FaShoppingCart, FaUser, FaUserCog, FaPlus, FaHome, FaSignOutAlt } from "react-icons/fa";

function NavigationBar() {
  const { productosCarrito } = useContext(CarritoContext);
  const { user, admin, logout } = useAuthContext();

  //Nombre de usuario
  const displayName = user ? user.split("@")[0] : null;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FaHome className="me-2" /> Mi Tienda
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="d-flex flex-column flex-lg-row w-100">
            <div className="d-flex flex-column flex-lg-row me-lg-auto">
              <Link
                to="/productos"
                className="nav-link text-white px-2 px-lg-3 py-2"
              >
                Productos
              </Link>
              <Link
                to="/nosotros"
                className="nav-link text-white px-2 px-lg-3 py-2"
              >
                Nosotros
              </Link>
              <Link
                to="/contacto"
                className="nav-link text-white px-2 px-lg-3 py-2"
              >
                Contacto
              </Link>
            </div>
            <div className="d-flex flex-column flex-lg-row align-items-center">
              {admin && (
                <>
                  <Link
                    to="/admin"
                    className="nav-link text-white px-2 px-lg-3 py-2"
                  >
                    <FaUserCog className="me-1" /> Admin
                  </Link>
                  <Link
                    to="/admin/agregarProducto"
                    className="nav-link text-white px-2 px-lg-3 py-2"
                  >
                    <FaPlus className="me-1" /> Producto
                  </Link>
                </>
              )}
              <Link
                to="/carrito"
                className="nav-link text-white px-2 px-lg-3 py-2 position-relative"
              >
                <FaShoppingCart className="me-1" />
                {productosCarrito.length > 0 && (
                  <Badge
                    pill
                    bg="danger"
                    className="position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: "0.6rem" }}
                  >
                    {productosCarrito.length}
                  </Badge>
                )}
              </Link>

              {user ? (
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="dark"
                    className="d-flex align-items-center nav-link text-white px-2 px-lg-3 py-2"
                  >
                    <FaUser className="me-1" /> {displayName}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-dark">
                    <Dropdown.Item as={Link} to="/perfil">
                      Mi Perfil
                    </Dropdown.Item>
                    <Dropdown.Item onClick={logout}>
                      <FaSignOutAlt className="me-1" /> Cerrar Sesión
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link
                  to="/login"
                  className="nav-link text-white px-2 px-lg-3 py-2"
                >
                  <FaUser className="me-1" /> Login
                </Link>
              )}
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;