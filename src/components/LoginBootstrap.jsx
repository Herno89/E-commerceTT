import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { crearUsuario, loginEmailPass } from '../auth/firebase';
import { dispararSweetBasico } from '../assets/SweetAlert';
import { Form, Button, Container, Card } from 'react-bootstrap';


function LoginBootstrap() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const { login, user, logout, admin } = useAuthContext();
  const [show, setShow] = useState(true)
  const navigate = useNavigate();
    useEffect(() => {
    if (user || admin) {
      navigate('/perfil');
    }
  }, [user, admin, navigate]);
  const handleSubmit = (e) => {
   
    e.preventDefault();
    // Simulación de autenticación
    if (usuario === 'admin' && password === '1234') {
      login(usuario);
      navigate('/');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  function registrarUsuario(e) {
    e.preventDefault();
    crearUsuario(usuario, password).then((user) => {
      dispararSweetBasico("Usuario registrado","", "success", "Confirmar");
      login(usuario)
    }).catch((error) => {
      if(error.code=="auth/weak-password"){
        dispararSweetBasico("Contraseña debil","", "error", "cerrar");
        console.log(error.code);
        
      }
      
    })
    
  }
  const handleSubmit2 = (e) => {
    dispararSweetBasico("Sesion cerrada","", "success", "Confirmar");
    logout()
  }
  
  function iniciarSesionEmailpass(e){
    e.preventDefault();
    loginEmailPass(usuario, password).then((user) => {
      login(usuario)
      dispararSweetBasico("Usuario logueado","", "success", "Confirmar");
    }).catch((error) => {
      if(error.code=="auth/invalid-credential"){
        dispararSweetBasico("Credenciales incorrectas","", "error", "cerrar");
        
      }
      
    })
  }
  function handleShow(e) {
    e.preventDefault();
    setShow(!show)
  }
  if(user || admin){
    return(
      <form onSubmit={handleSubmit2}>
        <button type='submit'>Cerrar sesion</button>
        

      </form>
    )
  }
  if(!user && show){
    return(
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow" style={{ width: '100%', maxWidth: '500px' }}>
        <Form onSubmit={iniciarSesionEmailpass}>
          <h2 className="text-center mb-4">Iniciar sesión</h2>

          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="mb-3"
            required
          />

          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
            required
          />

          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              Ingresar
            </Button>
            <Button variant="secondary" onClick={handleShow}>
              Registrarse
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
    )
  }
  if(!user && !show){

    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow" style={{ width: '100%', maxWidth: '500px' }}>
        <Form onSubmit={registrarUsuario}>
          <h2 className="text-center mb-4">Registrarse</h2>

          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="mb-3"
            required
          />

          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
            required
          />

          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              Registrarse
            </Button>
            <Button variant="secondary" onClick={handleShow}>
              Iniciar Sesión
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
    )
  }
}
export default LoginBootstrap;