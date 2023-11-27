import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/actions";

const RegisterVan = () => {
  const dispatch = useDispatch();

  const handlerSubmit = async e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const risposta = await fetch(
      "http://localhost:8080/register_van/" +
        {
          /*QUI METTERE IL TOKEN PER REGISTRARE IL VAN PER L'UTENTE LOGGATO COME RENTER*/
        },
      {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({})
      }
    );
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
          <Col>
            <h2>Form Registrazione Van</h2>
          </Col>
          <Col>
            <Form onSubmit={handlerSubmit}>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Targa</Form.Label>
                    <Form.Control
                      type="text"
                      name="targa"
                      id="targa"
                      placeholder="Targa..."
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Data d'immatricolazione</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      id="date"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Modello</Form.Label>
                    <Form.Control
                      name="modello"
                      id="modello"
                      type="text"
                      placeholder="Modello..."
                    />
                  </Form.Group>
                  <Form.Label>Numero di posti</Form.Label>
                  <Form.Select
                    className="mb-3"
                    name="posti"
                    id="posti"
                    aria-label="Default select example">
                    <option></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="">6+</option>
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

export default RegisterVan;
