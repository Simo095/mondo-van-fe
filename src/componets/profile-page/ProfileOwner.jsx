import { Card, Col, Container, Row } from "react-bootstrap";
import NavBar from "../NavBar";
import { FaRegPenToSquare } from "react-icons/fa6";
import CardPrenotazioni from "./CardPrenotazioni";
import cover from "../../assets/user_placeholder.png";
import SideBar from "../SideBar";

const ProfileOwner = () => {
  const modifyCover = e => {
    console.log(e);
  };
  return (
    <>
      <NavBar />
      <Container
        fluid
        className="d-flex flex-column flex-nowrap gap-5">
        <Row
          className="d-flex flex-nowrap"
          style={{ width: "inherit", maxWidth: "1100px" }}>
          <Col sm={3}>
            <SideBar />
          </Col>
          <Col className="d-flex">
            <Row className="d-flex gap-3 no-wrap">
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
              <Row
                className="d-flex justify-content-center no-wrap"
                style={{ height: "60vh" }}>
                <Col className="d-flex justify-content-center">
                  <Card>
                    <Card.Header>Il tuo Van</Card.Header>
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
                <Col className="d-flex justify-content-center">
                  <Card>
                    <Card.Header>Le prenotazioni attive dei van travelers</Card.Header>
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
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ProfileOwner;
