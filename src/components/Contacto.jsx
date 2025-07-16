import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
  FloatingLabel
} from "react-bootstrap";
import { dispararSweetBasico } from "../assets/SweetAlert";

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    consulta: ""
  });
  const [status, setStatus] = useState({
    message: "",
    variant: "" 
  });
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setStatus({ message: "Enviando...", variant: "info" });
    setValidated(true);

    try {
      const response = await fetch("https://formspree.io/f/xovdoejk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        
        dispararSweetBasico(
          "Mensaje enviado con éxito!",
          "",
          "success",
          "Cerrar"
        );setStatus({ 
          message: "Mensaje enviado con éxito!", 
          variant: "success" 
        });
        setFormData({
          nombre: "",
          apellido: "",
          email: "",
          consulta: ""
        });
        setValidated(false);
      } else {
        throw new Error("Error en la respuesta del servidor");
      }
    } catch (error) {
      setStatus({ 
        message: "Error al enviar el mensaje", 
        variant: "danger" 
      });
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                <h2>Contacto</h2>
              </Card.Title>
              
              {status.message && (
                <Alert variant={status.variant} className="mb-4">
                  {status.message}
                </Alert>
              )}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <FloatingLabel 
                      controlId="nombre" 
                      label="Nombre" 
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        placeholder="Nombre"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingresa tu nombre
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>
                  
                  <Col md={6}>
                    <FloatingLabel 
                      controlId="apellido" 
                      label="Apellido" 
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                        placeholder="Apellido"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingresa tu apellido
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>
                </Row>

                <FloatingLabel 
                  controlId="email" 
                  label="Email" 
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingresa un email válido
                  </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel 
                  controlId="consulta" 
                  label="Tu consulta" 
                  className="mb-4"
                >
                  <Form.Control
                    as="textarea"
                    name="consulta"
                    value={formData.consulta}
                    onChange={handleChange}
                    required
                    placeholder="Tu consulta"
                    style={{ height: '150px' }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor escribe tu consulta
                  </Form.Control.Feedback>
                </FloatingLabel>

                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">
                    Enviar Mensaje
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Contacto;