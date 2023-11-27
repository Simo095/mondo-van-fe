import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/actions";

const Register = () => {
  const dispatch = useDispatch();

  const handlerSubmit = async e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const risposta = await fetch("http://localhost:8080/register_" + data.get("uri"), {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: data.get("name"),
        surname: data.get("surname"),
        birthday: data.get("date"),
        email: data.get("email"),
        password: data.get("password")
      })
    });
    if (risposta.ok) {
      const user = await risposta.json();
      dispatch(addUser(user));
    }
  };
  return (
    <div className="Register">
      <Button
        variant="success"
        href="/"
        className="m-5 registerButton">
        Home
      </Button>
      <Container className="mt-5 d-flex justify-content-center">
        <Row className="d-flex flex-column">
          <p>Vuoi vivere un avventura con uno stupendo van a noleggio registrati</p>
          <Col>
            <h2>Form Registrazione Utente</h2>
          </Col>
          <Col>
            <Form onSubmit={handlerSubmit}>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter your name"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Data di nascita</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      id="date"
                      placeholder="Enter your birthday"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control
                      name="surname"
                      id="surname"
                      type="text"
                      placeholder="Enter your surname"
                    />
                  </Form.Group>
                  <Form.Label>Come vuoi registrati?</Form.Label>
                  <Form.Select
                    className="mb-3"
                    name="uri"
                    id="uri"
                    aria-label="Default select example">
                    <option></option>
                    <option value="renter">Voglio rendere disponibile il mio Van</option>
                    <option value="renterholder">Voglio noleggiare un Van</option>
                  </Form.Select>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
            </Form>
          </Col>
          <Button
            type="submit"
            className="registerButton">
            Submit
          </Button>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
