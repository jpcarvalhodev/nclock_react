import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NotFound = () => {

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Row className="text-center">
        <Col>
          <Alert variant="danger">
            <Alert.Heading>Erro 401</Alert.Heading>
            <p>
              Você precisa estar logado para acessar esta página. Retorne para a página inicial e faça login.
            </p>
            <Link to="/">
              <Button variant="outline-danger">Voltar para a página inicial</Button>
            </Link>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};