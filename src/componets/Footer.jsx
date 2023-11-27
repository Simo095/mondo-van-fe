import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <Container
        className="d-flex align-items-center"
        style={{
          height: "30vh"
        }}>
        <Row className="d-flex flex-grow-1">
          <Col className="d-flex flex-grow-1">
            <Row className="flex-grow-1 d-flex">
              <Col sm={4}>
                <Row className="d-flex flex-column">
                  <Col>Elemento 1.1</Col>
                  <Col>Elemento 1.1</Col>
                  <Col>Elemento 1.1</Col>
                </Row>
              </Col>
              <Col>
                <Row className="d-flex flex-column">
                  <Col>Elemento 1.1</Col>
                  <Col>Elemento 1.1</Col>
                  <Col>Elemento 1.1</Col>
                </Row>
              </Col>
              <Col>
                <Row className="d-flex flex-column">
                  <Col>Elemento 1.1</Col>
                  <Col>Elemento 1.1</Col>
                  <Col>Elemento 1.1</Col>
                </Row>
              </Col>
              <Col>
                <Row className="d-flex flex-column">
                  <Col>Elemento 1.1</Col>
                  <Col>Elemento 1.1</Col>
                  <Col>Elemento 1.1</Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
