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
  const [image, setImage] = useState("");
  const hadlerForm = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.get("password");
    data.get("email");

    const request = await fetch("http://localhost:8080/sign_in/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password")
      })
    });
    if (request.ok) {
      const objResp = await request.json();
      console.log(objResp);
    }
  };

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
                  id="email">
                  <Form.Label>User's Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    name="email"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-5"
                  id="password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                </Form.Group>
                <Button
                  className="registerButton"
                  type="submit">
                  Login
                </Button>
              </Form>
              <Row className="d-flex flex-column gap-4">
                <Col className="d-flex justify-content-center gap-5">
                  <Link to="/register">Don't have any accounts?</Link>
                  <Link to="/register">Forgot password?</Link>
                </Col>
                <Col className="text-center"></Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Login;
