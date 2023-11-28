import { Button, Card, Col, Container, Row } from "react-bootstrap";
import NavBar from "./NavBar";
import CardPrenotazioni from "./CardPrenotazioni";

const ProfileCustomer = () => {
  return (
    <>
      <NavBar />
      <Container
        fluid
        className="d-flex flex-column align-items-center gap-5 justify-content-center">
        <Row
          className="d-flex justify-content-center no-wrap"
          style={{ height: "60vh" }}>
          <Col className="d-flex">
            <Card>
              <Card.Header>Le tue prenotazioni attive</Card.Header>
              <Row className="d-flex flex-grow-1">
                <Col
                  sm={4}
                  className="d-flex">
                  <CardPrenotazioni></CardPrenotazioni>
                </Col>
              </Row>
              <Card.Footer className="text-muted"></Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row
          className="d-flex justify-content-center no-wrap"
          style={{ height: "60vh" }}>
          <Col className="d-flex">
            <Card>
              <Card.Header>Le tue prenotazioni attive</Card.Header>
              <Row className="d-flex flex-grow-1">
                <Col
                  sm={4}
                  className="d-flex">
                  <CardPrenotazioni></CardPrenotazioni>
                </Col>
              </Row>
              <Card.Footer className="text-muted"></Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ProfileCustomer;
