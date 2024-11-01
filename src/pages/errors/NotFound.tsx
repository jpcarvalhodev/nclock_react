import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import '../../css/ErrorPages.css';

// Define a página de erro 404
export const NotFound = () => {

  // Remove o token do localStorage e redireciona para a página de login
  const returnToLogin = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  return (
    <div className='background'>
      <Container className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
        <Row className="text-center">
          <Col md={7} sm={8} xs={10}>
            <Alert variant="light" className='alert'>
              <img className='logo-img' src="/logo_login.png" alt="logo" />
              <p>
                Funcionalidade não disponível. Contacte o administrador do sistema.
              </p>
              <Button onClick={returnToLogin} className='link-button'>Voltar para o login</Button>
            </Alert>
          </Col>
        </Row>
      </Container>
    </div>
  );
};