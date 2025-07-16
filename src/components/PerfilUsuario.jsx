import { Card, Container, Button, ListGroup } from 'react-bootstrap';
import { useAuthContext } from '../contexts/AuthContext';
import { FaUser, FaEnvelope, FaUserShield, FaSignOutAlt, FaEdit } from 'react-icons/fa';

function PerfilUsuario() {
  const { user, admin, logout } = useAuthContext();
  if (!user) {
    return (
      <Container className="my-5 text-center">
        <h3>Debes iniciar sesión para ver tu perfil</h3>
        <Button href="/login" variant="primary" className="mt-3">
          Ir a Login
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <h3 className="mb-0 d-flex align-items-center">
            <FaUser className="me-2" /> Mi Perfil
          </h3>
        </Card.Header>
        
        <Card.Body>
          <div className="d-flex flex-column flex-md-row align-items-center mb-4">
            <div className="mb-3 mb-md-0 me-md-4">
              <div 
                className="rounded-circle bg-secondary d-flex align-items-center justify-content-center" 
                style={{ width: '120px', height: '120px' }}
              >
                <FaUser size={60} className="text-light" />
              </div>
            </div>
            
            <div>
              <h4 className="mb-3">{user.split('@')[0]}</h4>
              
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex align-items-center">
                  <FaEnvelope className="me-2 text-muted" />
                  <span>{user}</span>
                </ListGroup.Item>
                
                {admin && (
                  <ListGroup.Item className="d-flex align-items-center">
                    <FaUserShield className="me-2 text-muted" />
                    <span className="text-success">Cuenta de Administrador</span>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </div>
          </div>
          
          <div className="d-flex justify-content-end gap-2">

            
            <Button 
              variant="outline-danger" 
              onClick={logout}
              className="d-flex align-items-center"
            >
              <FaSignOutAlt className="me-2" /> Cerrar Sesión
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PerfilUsuario;