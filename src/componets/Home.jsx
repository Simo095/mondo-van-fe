import { Link } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import sfondoHome from "../assets/VW-Stars-Blue.jpg";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="Home">
      <NavBar />
      <Row
        className="d-flex flex-row"
        style={{
          height: "100vh"
        }}>
        {/* <Col sm={3}>
          <SideBar />
        </Col> */}
        <Col>
          <Row>
            <Col
              className="d-flex flex-column justify-content-center align-items-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1594495894542-a46cc73e081a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "bottom",
                height: "100vh"
              }}>
              <p>NOLEGGIA UN VAN PER LA TUA PROSSIMA VACANZA, E VIVI UN AVVENTUA INDIMENTICABILE</p>
              <Form
                className="d-flex"
                style={{ marginBottom: "30rem", width: "80vh" }}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Col>
          </Row>
          <Container></Container>
        </Col>
      </Row>
      <Footer />
    </div>
  );
};
export default Home;
