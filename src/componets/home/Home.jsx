import { Col, Container, Row } from "react-bootstrap";
import sfondoHome from "../../assets/VW-Giallo.jpg";
import NavBar from "../../componets/stucture/NavBar";
import Footer from "../Footer";
import FormHome from "./FormHome";

const Home = () => {
  return (
    <div className="Home">
      <Row
        className="d-flex flex-row"
        style={{
          height: "100vh"
        }}>
        <Col
          style={{
            backgroundImage: `url(${sfondoHome})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            height: "100vh"
          }}>
          <NavBar />
          <Row className="mt-5">
            <Col className="d-flex flex-column justify-content-center align-items-center">
              <Row style={{ height: "20vh" }}>
                <Col>
                  <FormHome />
                </Col>
              </Row>
              <Container
                fluid
                className="d-flex flex-column align-items-center position-relative">
                <p className="shadow-p">
                  NOLEGGIA UN VAN PER LA TUA PROSSIMA VACANZA, E VIVI UN AVVENTUA INDIMENTICABILE
                </p>
              </Container>
            </Col>
          </Row>
        </Col>
      </Row>
      <Footer />
    </div>
  );
};
export default Home;
