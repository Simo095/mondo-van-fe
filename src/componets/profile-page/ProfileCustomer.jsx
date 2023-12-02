import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { FaRegPenToSquare } from "react-icons/fa6";
import NavBar from "../NavBar";
import CardPrenotazioni from "./CardPrenotazioni";
import cover from "../../assets/user_placeholder.png";

const ProfileCustomer = () => {
  const modifyCover = e => {
    console.log(e);
  };
  return (
    <>
      <NavBar />
      <Container
        fluid
        className="d-flex flex-column align-items-center gap-5 justify-content-center">
        <Row style={{ width: "inherit", maxWidth: "900px" }}>
          <Col
            className="d-flex justify-content-end"
            style={{
              backgroundImage: `url(${cover})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "50vh"
            }}>
            <FaRegPenToSquare
              className="mt-2"
              onClick={modifyCover}
              style={{ cursor: "pointer", opacity: "0.5" }}></FaRegPenToSquare>
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
