import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import image1 from "../../assets/img/VW-Stars.jpg";
import image2 from "../../assets/img/VW-Bianco.jpg";
import image3 from "../../assets/img/VW-Adventure.jpg";
import image4 from "../../assets/img/VW-Stars-Blue.jpg";
import image5 from "../../assets/img/VW-RedPlant.avif";
import image6 from "../../assets/img/VW-WhiteOpen.avif";
import image7 from "../../assets/img/JungleRoad.avif";
import image8 from "../../assets/img/InfiniteRoad.avif";
import image9 from "../../assets/img/InfiniteRoad2.avif";
import image10 from "../../assets/img/InfiniteRoad3.avif";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToken, logged } from "../../redux/actions";
import { Alert, FormGroup } from "react-bootstrap";
import { VscSignIn } from "react-icons/vsc";
import "../../assets/style/card-login.css";
import "../../assets/style/spinner-login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error401, setError401] = useState(false);
  const [error404, setError404] = useState(false);

  const hadlerForm = async event => {
    event.preventDefault();
    setLoading(true);
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
      setLoading(false);
      dispatch(addToken(objResp.token));
      dispatch(logged(true));
      navigate("/auth");
    } else {
      if (request.status === 401) {
        setError401(true);
        setLoading(false);
      }
      if (request.status === 404) {
        setError404(true);
        setLoading(false);
      }
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
        onClick={() => {
          setError401(false);
        }}
        style={{ height: "100vh" }}
        className="containerLogin d-flex align-items-center justify-content-center">
        <Container className="CardContainer">
          <div className="circle1"></div>
          <div className="circle2"></div>
          <Container className="ContainerCard">
            <Row className="log-card">
              <Col className="d-flex flex-column align-items-center justify-content-center">
                {error401 ? (
                  <Alert variant="danger">Controlla i dati inseriti, se non sei registrato registrati prima...</Alert>
                ) : (
                  <></>
                )}
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
              <Link
                style={{
                  color: "black",
                  textDecoration: "none",
                  fontSize: "1em",
                  letterSpacing: "1px"
                }}
                to="/register">
                Forgot password?
              </Link>
            </Row>
          </Container>
        </Container>
      </Container>

      <Container fluid>
        <Row className="LoginRow">
          <Col
            className="LoginImg d-flex justify-content-center align-items-centr"
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
            <Container
              onClick={() => {
                setError401(false);
              }}>
              <Row className="d-flex flex-column">
                <Col className="d-flex justify-content-center mb-5">
                  {loading ? (
                    <div class="spinnerLogin ">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  ) : (
                    <></>
                  )}
                </Col>
                <Col className="d-flex justify-content-center align-items-center flex-column">
                  {error401 ? (
                    <Alert variant="danger">Controlla i dati inseriti, se non sei registrato registrati prima...</Alert>
                  ) : (
                    <></>
                  )}
                  {error404 ? (
                    <Alert variant="danger">Controlla i dati inseriti, se non sei registrato registrati prima...</Alert>
                  ) : (
                    <></>
                  )}

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
                      style={{ backgroundColor: "#FFC007" }}
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
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Login;
