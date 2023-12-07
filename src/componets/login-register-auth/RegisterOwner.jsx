import { RiArrowGoBackLine } from "react-icons/ri";
import { RiSendPlaneFill } from "react-icons/ri";
import { GrFormNextLink } from "react-icons/gr";
import { IoArrowBackCircleOutline, IoArrowRedo } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import sfondoTre from "../../assets/sfondoTre.png";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  FormLabel,
  FormSelect,
  Image,
  Modal,
  ModalHeader,
  Row
} from "react-bootstrap";
import ReactCardFlip from "react-card-flip";

const RegisterOwner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState();
  const [province, setProvince] = useState("");
  const [towns, setTowns] = useState();
  const [town, setTown] = useState();
  const [via, setVia] = useState("");
  const [flip, setFlip] = useState(false);
  const [firstForm, setFirstForm] = useState(null);
  const [errorFirstForm, setErrorFirstForm] = useState(false);
  const [rispOk, setRispOk] = useState(false);

  const handlerSubmit = async e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const risposta = await fetch("http://localhost:8080/sign_in/owner_register", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: firstForm.name,
        surname: firstForm.surname,
        dayOfBirth: firstForm.dayOfBirth,
        idTown: town,
        street: data.get("street"),
        houseNumber: data.get("houseNumber"),
        zipCode: data.get("zipCode"),
        email: firstForm.email,
        password: firstForm.password
      })
    });

    if (risposta.ok) {
      const o = await risposta.json();
      setRispOk(true);
    } else {
      //ERRORI
    }
  };

  const handlerFirstForm = e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("password") === data.get("passwordConfirm")) {
      handlerFlip();
      const obj = {
        name: data.get("name"),
        surname: data.get("surname"),
        dayOfBirth: data.get("date"),
        email: data.get("email"),
        password: data.get("password")
      };
      setFirstForm(obj);
    }
    setErrorFirstForm(true);
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
  const handleTownsChange = e => {
    e.preventDefault();
    setTown(e.target.value);
    console.log(town);
  };
  const handleStreetChange = e => {
    e.preventDefault();
    setVia(e.target.value);
  };
  const handlerFlip = e => {
    setFlip(!flip);
  };

  useEffect(() => {
    fetchProvince();
  }, []);

  return (
    <div
      className="Register gradient-background"
      style={{ height: "100vh" }}>
      <div className="d-flex justify-content-between">
        <h1>Registrati ed entra a far parte della comunity!</h1>
        <div className="d-flex align-items-center">
          <IoArrowBackCircleOutline
            onClick={() => {
              navigate("/");
            }}
            className="fs-1"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <Container>
        <Row className="d-flex flex-grow-1 justify-content-center align-items-center">
          {rispOk && (
            <Modal
              show={rispOk}
              autoFocus
              style={{ color: "#75B798" }}
              onHide={() => {
                setRispOk(false);
                navigate("/");
              }}>
              <ModalHeader
                style={{ background: "#051C12", borderColor: "green" }}
                closeButton
                closeVariant="white">
                <Modal.Title>Benvenuto, {firstForm.name} sei dei nostri!</Modal.Title>
              </ModalHeader>
              <Modal.Body style={{ background: "#051C12" }}>Registrazione avvenuta con successo</Modal.Body>
            </Modal>
          )}
          <Col sm={5}>
            <Image
              fluid
              className="e2e-ImageModuleContent-img ImageModuleContent-mainImage-IG1"
              srcSet="https://mir-s3-cdn-cf.behance.net/project_modules/disp/3f483f97004499.5ebb3291132b2.gif 500w"
              alt="Travel GIFs"
              shouldblockrightclickevents="true"
              style={{ marginTop: "2rem" }}
            />
          </Col>
          <Col
            className="d-flex justify-content-center align-items-center"
            sm={7}
            style={{
              overflow: "unset",
              backgroundImage: `url(${sfondoTre})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "470px",
              backgroundPositionY: "66%",
              backgroundPositionX: "83%",
              height: "90vh"
            }}>
            <ReactCardFlip
              isFlipped={flip}
              containerClassName="d-flex "
              containerStyle={{}}
              cardStyles={{}}
              flipDirection="horizontal">
              <Card
                className="d-flex align-items-center"
                style={{
                  background: "#00000000",
                  border: "none"
                }}>
                <Card.Header className="w-75 text-center border-0">
                  Inserisci i tuoi dati e dopo potrai inserire i dettagli del tuo mezzo
                </Card.Header>
                <Card.Body>
                  <Row className="d-flex flex-column">
                    <Form onSubmit={handlerFirstForm}>
                      <Col className="d-flex justify-content-center">
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            required
                            name="name"
                            id="name"
                            placeholder="Nome..."
                          />
                        </Form.Group>
                      </Col>
                      <Col className="d-flex justify-content-center">
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            required
                            name="surname"
                            id="surname"
                            placeholder="Cognome..."
                          />
                        </Form.Group>
                      </Col>
                      <Col className="d-flex justify-content-center">
                        <Form.Group className="mb-3">
                          <Form.Control
                            style={{ width: "205px" }}
                            type="date"
                            name="date"
                            required
                            id="date"
                          />
                        </Form.Group>
                      </Col>
                      <Col className="d-flex justify-content-center">
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Inserisci un indirizzo email valido..."
                          />
                        </Form.Group>
                      </Col>
                      <Col className="d-flex justify-content-center gap-5">
                        <Form.Group className="mb-3">
                          <Form.Control
                            name="password"
                            required
                            id="password"
                            type="password"
                            placeholder="Scegli una password..."
                          />
                        </Form.Group>
                      </Col>
                      <Col className="d-flex justify-content-center gap-5">
                        <Form.Group className="mb-3">
                          <Form.Control
                            name="passwordConfirm"
                            id="passwordConfirm"
                            required
                            type="password"
                            placeholder="Conferma password"
                          />
                        </Form.Group>
                      </Col>
                      <Col className="d-flex justify-content-center gap-5">
                        <Button
                          style={{ background: "#00000000", border: "white" }}
                          type="submit">
                          <GrFormNextLink style={{ cursor: "pointer", color: "black", fontSize: "2em" }} />
                        </Button>
                      </Col>
                    </Form>
                  </Row>
                </Card.Body>
              </Card>

              <Card
                className="d-flex"
                style={{
                  background: "#00000000",
                  border: "none"
                }}>
                <Card.Header className="text-center border-0">Completa con la via di residenza</Card.Header>
                <Card.Body>
                  <Row className="d-flex flex-column">
                    <Form onSubmit={handlerSubmit}>
                      <Col className="d-flex gap-5 justify-content-center">
                        <Form.Group className="mb-3">
                          <FormSelect
                            style={{ width: "250px" }}
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
                      </Col>
                      <Col className="d-flex gap-5 justify-content-center">
                        <Form.Group className="mb-3">
                          <FormSelect
                            style={{ width: "250px" }}
                            name="town"
                            value={town}
                            onChange={handleTownsChange}>
                            <option>prima seleziona una provincia</option>
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
                        </Form.Group>
                      </Col>
                      <Col className="d-flex gap-5 justify-content-center">
                        <Form.Group className="mb-3">
                          <FormLabel>Inserisci la via</FormLabel>
                          <Form.Control
                            type="text"
                            name="street"
                            id="street"
                            placeholder="via/piazza/vicolo..."
                          />
                        </Form.Group>
                      </Col>
                      <Col className="d-flex gap-5 justify-content-center">
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            name="houseNumber"
                            id="houseNumber"
                            placeholder="Numero civico..."
                          />
                        </Form.Group>
                      </Col>
                      <Col className="d-flex gap-5 justify-content-center">
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            name="zipCode"
                            id="zipCode"
                            placeholder="CAP.."
                          />
                        </Form.Group>
                      </Col>
                      <Col className="d-flex gap-5 justify-content-center align-items-center">
                        <RiArrowGoBackLine
                          style={{ cursor: "pointer", fontSize: "2em" }}
                          onClick={handlerFlip}
                        />
                        <Button
                          style={{ background: "#00000000", border: "white" }}
                          type="submit">
                          <IoArrowRedo style={{ cursor: "pointer", color: "#000000", fontSize: "2em" }} />
                        </Button>
                      </Col>
                    </Form>
                  </Row>
                </Card.Body>
              </Card>
            </ReactCardFlip>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterOwner;
