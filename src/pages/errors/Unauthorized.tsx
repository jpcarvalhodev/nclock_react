import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../css/ErrorPages.css';

// Define a página de erro 401
export const Unauthorized = () => {
  return (
    <div className='background'>
      <Container className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
        <Row className="text-center">
          <Col md={7} sm={8} xs={10}>
            <Alert variant="light" className='alert'>
              <img className='logo-img' src="/logo_login.png" alt="logo" />
              <Alert.Heading className='error-title'>Erro 401</Alert.Heading>
              <p>
                Seu acesso expirou, retorne e faça login novamente. Caso tenha problemas, contacte o administrador do sistema.
              </p>
              <Link to="/">
                <Button className='link-button'>Voltar para o login</Button>
              </Link>
            </Alert>
          </Col>
        </Row>
      </Container>
    </div>
  );
};