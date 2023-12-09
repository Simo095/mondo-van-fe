import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  FormLabel,
  FormSelect,
  Modal,
  ModalHeader,
  Row
} from "react-bootstrap";
import Camper from "../../assets/Camper.png";
import Jeep from "../../assets/Jeep.png";
import Rooftop from "../../assets/Rooftop.png";
import Van from "../../assets/Van.png";
import Altro from "../../assets/Altro.png";
import NavBar from "../NavBar";
import FlipCard from "../FlipCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, addVehicle } from "../../redux/actions";
import { useNavigate } from "react-router";
import { RiArrowGoBackLine, RiSendPlaneFill } from "react-icons/ri";
import { IoArrowBackCircleOutline, IoArrowRedo } from "react-icons/io5";
import ReactCardFlip from "react-card-flip";
import { GrFormNextLink } from "react-icons/gr";

const RegisterVehicle = () => {
  const typeForm = ["Camper", "Van", "Jeep attrezzata", "Macchina rooftop", "Altro"];
  const serverEnum = ["CAMPER", "VAN", "CAMPERIZED_JEEP", "ROOFTOOP_CAR", "OTHER"];
  const image = [Camper, Van, Jeep, Rooftop, Altro];
  const [checked, setChecked] = useState([false, false, false, false, false]);
  const [typeServer, setTypeServer] = useState("");
  const [errorTypeServer, setErrorTypeServer] = useState(false);
  const [rispOk, setRispOk] = useState(false);
  const [flip, setFlip] = useState(false);
  const [firstForm, setFirstForm] = useState(null);
  const [errorFirstForm, setErrorFirstForm] = useState(false);

  const token = useSelector(state => state.login.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerFlip = e => {
    setFlip(!flip);
  };

  const handlerForm = async e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const richiesta = await fetch("http://localhost:8080/vehicles/register_vehicle", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: firstForm.name,
        model: firstForm.model,
        brand: firstForm.brand,
        sits: firstForm.sits,
        pricePerDay: firstForm.pricePerDay,
        supply: form.get("supply"),
        firstEnrollment: firstForm.firstEnrollment,
        license: firstForm.license,
        type: typeServer,
        transmission: form.get("transmission"),
        displacement: form.get("displacement"),
        kilometers: firstForm.kilometers,
        height: form.get("height"),
        width: form.get("width"),
        length: form.get("length"),
        shortDescriptions: form.get("shortDesc")
      })
    });
    if (richiesta.ok) {
      const vehicle = await richiesta.json();
      dispatch(addVehicle(vehicle));
      navigate(`/profile_owner`);
    }
  };

  const handlerFirstForm = e => {
    e.preventDefault();
    if (typeServer === "") {
      setErrorTypeServer(true);
    }
    const form = new FormData(e.currentTarget);
    handlerFlip();
    const obj = {
      name: form.get("name"),
      model: form.get("model"),
      brand: form.get("brand"),
      sits: form.get("sits"),
      pricePerDay: form.get("pricePerDay"),
      kilometers: form.get("kilometers"),
      license: form.get("license"),
      firstEnrollment: form.get("firstEnrollment")
    };
    setFirstForm(obj);
    setErrorFirstForm(true);
  };

  return (
    <div
      className="Register gradient-background"
      style={{ height: "100vh" }}>
      <div className="d-flex justify-content-between">
        <h1>Registrazione Van...</h1>
        <div className="d-flex align-items-center">
          <IoArrowBackCircleOutline
            onClick={() => {
              navigate("/");
            }}
            className="fs-1"
            style={{ cursor: "pointer" }}
          />
          <p className="m-0">Hai cambiato idea?</p>
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
                <Modal.Title>Registrazione Van</Modal.Title>
              </ModalHeader>
              <Modal.Body style={{ background: "#051C12" }}>Registrazione avvenuta con successo</Modal.Body>
            </Modal>
          )}
          <Col sm={5}>
            {errorTypeServer ? (
              <>
                <Alert variant="danger">Seleziona un tipo...</Alert>
              </>
            ) : (
              <></>
            )}
            <span>seleziona la tipologia del tuo van</span>
            <Row className="d-flex justify-content-center mt-3">
              {typeForm.map((x, i) => (
                <Col
                  key={i}
                  className="d-flex justify-content-center mt-2">
                  <FlipCard
                    type={typeForm[i]}
                    setForm={setTypeServer}
                    serverEnum={serverEnum[i]}
                    image={image[i]}
                    checked={checked}
                    setChecked={setChecked}
                    i={i}
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <Col
            className="d-flex justify-content-center align-items-center"
            sm={7}>
            <ReactCardFlip
              isFlipped={flip}
              containerClassName="d-flex "
              containerStyle={{}}
              cardStyles={{}}
              flipDirection="horizontal">
              <Card
                className="d-flex "
                style={{
                  background: "#00000000",
                  border: "none"
                }}>
                <Card.Header className="text-center border-0">Compila i campi</Card.Header>
                <Card.Body>
                  <Row className="d-flex flex-column">
                    <Form onSubmit={handlerFirstForm}>
                      <Col className="d-flex justify-content-center">
                        <Form.Group className="mb-3">
                          <Form.Control
                            name="name"
                            id="name"
                            type="text"
                            placeholder="Nome..."
                          />
                        </Form.Group>
                      </Col>
                      <Col className="d-flex justify-content-center">
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            name="brand"
                            id="brand"
                            required
                            placeholder="Marca..."
                          />
                        </Form.Group>
                      </Col>
                      <Col className="d-flex justify-content-center">
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            name="model"
                            id="model"
                            required
                            placeholder="Modello..."
                          />
                        </Form.Group>
                      </Col>

                      <Col className="d-flex justify-content-center gap-5">
                        <Form.Group className="mb-3">
                          <Form.Control
                            name="kilometers"
                            id="kilometers"
                            type="text"
                            required
                            placeholder="KM..."
                          />
                        </Form.Group>
                      </Col>
                      <Col className="d-flex justify-content-center gap-5">
                        <Form.Group className="mb-3">
                          <Form.Control
                            name="pricePerDay"
                            id="pricePerDay"
                            type="text"
                            required
                            placeholder="€/Giorno"
                          />
                        </Form.Group>
                      </Col>
                      <Col className="d-flex justify-content-center">
                        <Form.Group className="mb-3">
                          <FormLabel>Anni del mezzo, inserisci data</FormLabel>
                          <Form.Control
                            style={{ width: "205px" }}
                            type="date"
                            required
                            name="firstEnrollment"
                            id="firstEnrollment"
                          />
                        </Form.Group>
                      </Col>
                      <Col className="d-flex justify-content-center gap-5">
                        <Form.Group className="mb-3">
                          <Form.Select
                            style={{ width: "205px" }}
                            name="sits"
                            id="sits"
                            required>
                            <option>Posti in cabina</option>
                            <option value="2">2 posti a sedere</option>
                            <option value="3">3 posti a sedere</option>
                            <option value="4">4 posti a sedere</option>
                            <option value="5">5 posti a sedere</option>
                            <option value="6">6 posti a sedere</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col className="d-flex justify-content-center gap-5">
                        <Form.Group className="mb-3">
                          <Form.Select
                            style={{ width: "205px" }}
                            id="license"
                            name="license"
                            required>
                            <option>Seleziona una patente</option>
                            <option value="B">B</option>
                            <option value="B_96">B 96</option>
                            <option value="C">C</option>
                            <option value="CE">CE</option>
                            <option value="CD">CD</option>
                            <option value="CDE">CDE</option>
                          </Form.Select>
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
                className="d-flex "
                style={{
                  background: "#00000000",
                  border: "none"
                }}>
                <Card.Header className="text-center border-0">Qualche dettaglio tecnico</Card.Header>
                <Card.Body>
                  <Row className="d-flex flex-column">
                    <Form onSubmit={handlerForm}>
                      <Col className="d-flex justify-content-center">
                        <Form.Group className="mb-3">
                          <Form.Select
                            id="displacement"
                            name="displacement"
                            required>
                            <option>Seleziona una cilindrata</option>
                            <option value="1600">1600</option>
                            <option value="1800">1800</option>
                            <option value="2000">2000</option>
                            <option value="2200">2200</option>
                            <option value="2500">2500</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col className="d-flex justify-content-center">
                        <Form.Group className="mb-3">
                          <Form.Select
                            id="transmission"
                            name="transmission"
                            required>
                            <option>Seleziona un tipo di cambio</option>
                            <option value="AUTO">Automatico</option>
                            <option value="SEMI_AUTO">Semi automatico</option>
                            <option value="MANUAL">Manuale</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col className="d-flex justify-content-center">
                        <Form.Group className="mb-3">
                          <Form.Select
                            id="supply"
                            name="supply"
                            required>
                            <option>Seleziona una alimentazione</option>
                            <option value="GASOLINE">Benzina</option>
                            <option value="DIESEL">Diesel</option>
                            <option value="LPG_DIESEL">GPL e Diesel</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col className="d-flex justify-content-center gap-5">
                        <Form.Group className="mb-3">
                          <Form.Control
                            name="length"
                            id="length"
                            type="text"
                            placeholder="Lunghezza..."
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col className="d-flex justify-content-center gap-5">
                        <Form.Group className="mb-3">
                          <Form.Control
                            name="width"
                            id="width"
                            type="text"
                            placeholder="Larghezza..."
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col className="d-flex justify-content-center gap-5">
                        <Form.Group className="mb-3">
                          <Form.Control
                            name="height"
                            id="height"
                            type="text"
                            placeholder="Altezza Max..."
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col className="d-flex justify-content-center gap-5">
                        <Form.Group className="mb-3">
                          <Form.Control
                            name="shortDesc"
                            id="shortDesc"
                            type="text"
                            placeholder="Breve descrizione...(mansardato, etc)"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col className="d-flex gap-5 justify-content-center align-items-center">
                        <RiArrowGoBackLine
                          style={{ cursor: "pointer", fontSize: "1.5em" }}
                          onClick={handlerFlip}
                        />
                        <Button
                          style={{ background: "#00000000", border: "white" }}
                          type="submit">
                          <IoArrowRedo style={{ cursor: "pointer", color: "#000000", fontSize: "1.5em" }} />
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
export default RegisterVehicle;
