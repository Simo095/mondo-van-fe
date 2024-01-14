import { Col, Container, Image, Row } from "react-bootstrap";
import logo from "../../assets/img/LogoVanWorld.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="Footer">
      <Container
        className="d-flex align-items-center"
        style={{
          height: "30vh"
        }}>
        <Row className="d-flex flex-grow-1">
          <Col className="d-flex flex-grow-1">
            <Row className="flex-grow-1 d-flex">
              <Col sm={4}>
                <Row className="d-flex flex-column mt-5">
                  <Col>Informazioni utili</Col>
                  <Col>Contattaci</Col>
                  <Col>Termini e condizioni</Col>
                  {/* <Col>
                    Gli itinerari dell'Emilia Romagna sono presi dal sito{" "}
                    <Link to="emiliaromagnaturimo.it">emiliaromagnaturismo.it</Link>
                  </Col> */}
                </Row>
              </Col>
              <Col>
                <Row className="d-flex flex-column mt-5">
                  <Col>Seguici sui social</Col>
                  <Col>Facebook</Col>
                  <Col>Instagram</Col>
                </Row>
              </Col>
              <Col>
                <Row className="d-flex flex-column mt-5">
                  <Col>Van World</Col>
                  <Col>Il tuo portale per il viaggio in camper</Col>
                  <Col>Copyright © 2023 Van World</Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
