import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import image1 from "../../assets/VW-Stars.jpg";
import image2 from "../../assets/VW-Bianco.jpg";
import image3 from "../../assets/VW-Adventure.jpg";
import image4 from "../../assets/VW-Stars-Blue.jpg";
import image5 from "../../assets/VW-RedPlant.avif";
import image6 from "../../assets/VW-WhiteOpen.avif";
import image7 from "../../assets/JungleRoad.avif";
import image8 from "../../assets/InfiniteRoad.avif";
import image9 from "../../assets/InfiniteRoad2.avif";
import image10 from "../../assets/InfiniteRoad3.avif";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToken, logged } from "../../redux/actions";
import { FormGroup } from "react-bootstrap";
import { VscSignIn } from "react-icons/vsc";
import "../../assets/style/card-login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      dispatch(addToken(objResp.token));
      dispatch(logged(true));
      navigate("/auth");
    }
  };

  useEffect(() => {
    const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setImage(randomImage);
  }, []);

  return (
    <div className="Login">
      <Container
        style={{ height: "100vh" }}
        className="containerLogin d-flex align-items-center justify-content-center">
        <Container className="CardContainer">
          <div className="circle1"></div>
          <div className="circle2"></div>
          <Container className="ContainerCard">
            <Row className="log-card">
              <Col className="d-flex flex-column align-items-center justify-content-center">
                <VscSignIn fontSize={80} />
                <p>Sign in</p>
              </Col>
              <Form
                id="formSmall"
                onSubmit={hadlerForm}>
                <FormGroup className="InputCardLogin-group">
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="InputCardLogin"
                  />
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="InputCardLogin"
                  />
                </FormGroup>
              </Form>
              <Button
                form="formSmall"
                type="submit"
                variant="success"
                className="btn-login">
                Entra
              </Button>
              <Link
                style={{
                  color: "black",
                  textDecoration: "none",
                  fontSize: "1em",
                  letterSpacing: "1px"
                }}
                to="/register">
                Don't have any accounts?
              </Link>
            </Row>
          </Container>
        </Container>
      </Container>

      <Container fluid>
        <Row className="LoginRow">
          <Col
            className="LoginImg"
            style={{
              backgroundImage: `url(${image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100vh"
            }}></Col>
          <Col
            sm={4}
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
                className="">
                <Row className="d-flex flex-column justify-content-center">
                  <Col>
                    <Form.Group
                      className="mb-5"
                      id="email">
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
                  </Col>
                  <Col className="d-flex justify-content-center">
                    <Button
                      className="registerButton"
                      type="submit">
                      Entra!
                    </Button>
                  </Col>
                </Row>
              </Form>
              <Row className="mt-3 d-flex flex-column gap-4">
                <Col className="d-flex mt-5 justify-content-center gap-5">
                  <Link
                    style={{
                      color: "black",
                      textDecoration: "none",
                      fontSize: "1em",
                      letterSpacing: "1px"
                    }}
                    to="/register">
                    Don't have any accounts?
                  </Link>
                  <Link
                    className="disabled-link"
                    style={{
                      color: "black",
                      textDecoration: "none",
                      fontSize: "1em",
                      letterSpacing: "1px"
                    }}
                    to="/">
                    Forgot password?
                  </Link>
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
