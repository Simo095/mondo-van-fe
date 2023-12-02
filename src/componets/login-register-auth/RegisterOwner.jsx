import { Button, Col, Container, FormLabel, FormSelect, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/actions";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const RegisterOwner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState();
  const [province, setProvince] = useState("");
  const [towns, setTowns] = useState();
  const [town, setTown] = useState();
  const [via, setVia] = useState("");

  const handlerSubmit = async e => {
    e.preventDefault();
    console.log(town);
    const data = new FormData(e.currentTarget);
    const risposta = await fetch("http://localhost:8080/sign_in/owner_register", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: data.get("name"),
        surname: data.get("surname"),
        dayOfBirth: data.get("date"),
        idTown: town,
        street: data.get("street"),
        houseNumber: data.get("houseNumber"),
        zipCode: data.get("zipCode"),
        email: data.get("email"),
        password: data.get("password")
      })
    });
    if (risposta.ok) {
      console.log(risposta);
      const o = risposta.json();
      console.log(o);
      //navigate("/");
    } else {
    }
  };
  const fetchProvince = async e => {
    const risposta = await fetch("http://localhost:8080/sign_in/prov", {
      method: "GET"
    });
    if (risposta.ok) {
      const data = await risposta.json();
      setProvinces(data.content);
    } else {
      //QUI PER GESTIRE ERRORI
    }
  };
  const handleProvinceChange = async event => {
    event.preventDefault();
    setProvince(event.target.value);
    const risposta = await fetch("http://localhost:8080/sign_in/towns/" + event.target.value, {
      method: "GET"
    });
    if (risposta.ok) {
      const data = await risposta.json();
      console.log(data.content);
      setTowns(data.content);
    }
  };
  //CHANGE COMUNE
  const handletownsChange = e => {
    e.preventDefault();
    setTown(e.target.value);
    console.log(town);
  };
  const handleStreetChange = e => {
    e.preventDefault();
    setVia(e.target.value);
  };

  useEffect(() => {
    fetchProvince();
  }, []);

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
            <h2>Form Registrazione Proprietario del Camper</h2>
          </Col>
          <Col>
            <Form
              name="formCustomer"
              id="formCustomer"
              onSubmit={handlerSubmit}>
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
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <FormLabel>Indirizzo di residenza</FormLabel>
                    <FormSelect
                      style={{ width: "600px" }}
                      name="province"
                      value={province}
                      onChange={handleProvinceChange}>
                      <option>seleziona una provincia</option>
                      {provinces ? (
                        provinces.map((province, index) => (
                          <option
                            key={index}
                            value={province.abbreviation}>
                            {province.name}
                          </option>
                        ))
                      ) : (
                        <></>
                      )}
                    </FormSelect>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Group className="mb-3">
                      {province ? (
                        <>
                          <FormLabel>Seleziona il comune</FormLabel>
                          <FormSelect
                            name="town"
                            value={town}
                            onChange={handletownsChange}>
                            {towns ? (
                              towns.map((town, index) => (
                                <option
                                  key={index}
                                  value={town.id}>
                                  {town.name}
                                </option>
                              ))
                            ) : (
                              <></>
                            )}
                          </FormSelect>
                        </>
                      ) : (
                        <></>
                      )}
                    </Form.Group>
                  </Form.Group>
                  {town ? (
                    <>
                      <Form.Group className="mb-3">
                        <FormLabel>Inserisci la via</FormLabel>
                        <Form.Control
                          type="text"
                          name="street"
                          id="street"
                          placeholder="via/piazza/vicolo..."
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          name="houseNumber"
                          id="houseNumber"
                          placeholder="Numero civico..."
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          name="zipCode"
                          id="zipCode"
                          placeholder="CAP.."
                        />
                      </Form.Group>
                    </>
                  ) : (
                    <></>
                  )}
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
            form="formCustomer"
            className="registerButton">
            Inizia a prenotare!
          </Button>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterOwner;
