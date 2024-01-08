import { Alert, Button, Col, Container, Form, FormLabel, Modal, ModalHeader, Row } from "react-bootstrap";
import Camper from "../../assets/icone/Camper.png";
import Jeep from "../../assets/icone/Jeep.png";
import Rooftop from "../../assets/icone/Rooftop.png";
import Van from "../../assets/icone/Van.png";
import Altro from "../../assets/icone/Altro.png";

import ReactCardFlip from "react-card-flip";
import FlipCard from "../../componets/stucture/FlipCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVehicle } from "../../redux/actions";
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoArrowRedo } from "react-icons/io5";
import { GrFormNextLink } from "react-icons/gr";
import { fetchDisponibilita, fetchVehicle } from "../../redux/actions/fetchActions";

const RegisterVehicle = () => {
  const typeForm = ["Camper", "Van", "Jeep attrezzata", "Macchina rooftop", "Altro"];
  const serverEnum = ["CAMPER", "VAN", "CAMPERIZED_JEEP", "ROOFTOOP_CAR", "OTHER"];
  const image = [Camper, Van, Jeep, Rooftop, Altro];
  const [checked, setChecked] = useState([false, false, false, false, false]);
  const [typeServer, setTypeServer] = useState("");
  const [errorTypeServer, setErrorTypeServer] = useState(false);
  const [rispOk, setRispOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [flip, setFlip] = useState(false);
  const [firstForm, setFirstForm] = useState(null);
  const [errorFirstForm, setErrorFirstForm] = useState(false);

  const token = useSelector(state => state.login.token);

  const dispatch = useDispatch();

  const handlerFlip = e => {
    setFlip(!flip);
  };

  const handlerForm = async e => {
    e.preventDefault();
    setLoading(true);
    if (errorFirstForm) {
      setErrorTypeServer(true);
      setLoading(false);
      handlerFlip();
    } else {
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
        dispatch(fetchDisponibilita(token));
        setRispOk(true);
        setLoading(false);
      }
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
  };

  return (
    <Container style={{ height: "100vh" }}>
      <Row className="d-flex justify-content-center align-items-center">
        {rispOk && (
          <Modal
            show={rispOk}
            autoFocus
            style={{ color: "#75B798" }}
            onHide={() => {
              setRispOk(false);
              dispatch(fetchVehicle(token));
            }}>
            <ModalHeader
              style={{ background: "#051C12", borderColor: "green" }}
              closeButton
              closeVariant="white">
              <Modal.Title>Registrazione Van</Modal.Title>
            </ModalHeader>
            <Modal.Body style={{ background: "#051C12" }}>Registrazione del van avvenuta con successo</Modal.Body>
          </Modal>
        )}
        <Col sm={5}>
          {errorTypeServer ? <Alert variant="danger">Seleziona una tipologia...</Alert> : <></>}
          <span>seleziona la tipologia del tuo van</span>
          <Row
            md={1}
            lg={2}
            className="mt-3">
            {typeForm.map((x, i) => (
              <Col
                key={i}
                className="mt-2"
                onClick={() => {
                  setErrorFirstForm(false);
                  setErrorTypeServer(false);
                }}>
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
          className="d-flex mt-5 justify-content-center align-items-center"
          sm={7}>
          {loading && (
            <div className="d-flex flex-column">
              <p> Registrazione in corso...</p>
              <Alert
                variant="light"
                className="loader"></Alert>
            </div>
          )}
          <Container className="CardContainerRegister mt-5 ">
            <div className="circle1"></div>
            <div className="circle2"></div>
            <Container className="ContainerCard">
              <Row className="log-cardRegister">
                <Col className="d-flex flex-column align-items-center justify-content-center">
                  <p>Dettagli del tuo mezzo</p>
                </Col>
                <ReactCardFlip
                  isFlipped={flip}
                  containerClassName="d-flex "
                  flipDirection="horizontal">
                  <div
                    className="d-flex "
                    style={{
                      background: "#00000000",
                      border: "none"
                    }}>
                    <div>
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
                    </div>
                  </div>

                  <div
                    className="d-flex "
                    style={{
                      background: "#00000000",
                      border: "none"
                    }}>
                    <div>
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
                                <option value="ELECTRIC">Elettrico</option>
                                <option value="HYBRID">Ibrido</option>
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
                    </div>
                  </div>
                </ReactCardFlip>
              </Row>
            </Container>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
export default RegisterVehicle;
