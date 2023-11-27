import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Alert } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { VscSignIn } from "react-icons/vsc";
import { Link } from "react-router-dom";
import image1 from "../assets/VW-Stars.jpg";
import image2 from "../assets/VW-Bianco.jpg";
import image3 from "../assets/VW-Adventure.jpg";
import image4 from "../assets/VW-Stars-Blue.jpg";
import { useEffect, useState } from "react";

const Login = () => {
  const hadlerForm = event => {
    const data = new FormData(event.currentTarge);
    data.get("password");
    data.get("email");
    console.log(data.get("password") + " password");
    console.log(data.get("email") + " email");
  };
  const [image, setImage] = useState("");
  useEffect(() => {
    const images = [image1, image2, image3, image4];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setImage(randomImage);
  }, []);

  return (
    <div className="Logn">
      <Container
        fluid
        className="vh-70">
        <Row>
          <Col
            style={{
              backgroundImage: `url(${image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100vh"
            }}></Col>
          <Col
            sm={6}
            className="d-flex align-items-center">
            <Container>
              <Row>
                <Col className="d-flex justify-content-center align-items-center flex-column">
                  <VscSignIn fontSize={80} />
                  <p>Sign in</p>
                </Col>
              </Row>

              <Form
                onSubmit={hadlerForm}
                className="text-start">
                <Form.Group
                  className="mb-5"
                  controlId="email">
                  <Form.Label>User's Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    name="email"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-5"
                  controlId="password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                </Form.Group>
              </Form>
              <Row className="d-flex flex-column gap-4">
                <Col className="d-flex justify-content-center gap-5">
                  <Link to="/register">Don't have any accounts?</Link>
                  <Link to="/register">Forgot password?</Link>
                </Col>
                <Col className="text-center">
                  <Button
                    className="registerButton"
                    type="submit">
                    Login
                  </Button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Login;
