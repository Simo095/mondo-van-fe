import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Form,
  FormSelect,
  Modal,
  ModalHeader,
  Row
} from "react-bootstrap";
import FlipCard from "../FlipCard";
import ReactCardFlip from "react-card-flip";
import { GrFormNextLink } from "react-icons/gr";
import { RiArrowGoBackLine, RiSendPlaneFill } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVehicle } from "../../redux/actions";

const VehicleArrangement = () => {
  const [rispOk, setRispOk] = useState(false);
  const [flipOne, setFlipOne] = useState(false);
  const [flipTwo, setFlipTwo] = useState(false);

  const [firstForm, setFirstForm] = useState(null);
  const [secondForm, setSecondForm] = useState(null);
  const [thirdForm, setThirdForm] = useState(null);

  const [valueDoItMySelf, setValueDoItMySelf] = useState(false);
  const [bads, setBeds] = useState();
  const [cucina, setCucina] = useState(false);
  const [frigo, setFrigo] = useState(false);
  const [gas, setGas] = useState(false);
  const [bathroom, setBathroom] = useState(false);
  const [water, setWater] = useState(false);
  const [hotWater, setHotWater] = useState(false);
  const [wc, setWc] = useState(false);

  const [firstCardNotSend, setFisrtCardNotSend] = useState(false);
  const [errorCard, setErrorCard] = useState(false);
  const token = useSelector(state => state.login.token);
  const vehicle = useSelector(state => state.vehicles.vehicle);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerFlipOne = e => {
    setFlipOne(!flipOne);
  };
  const handlerFlipTwo = e => {
    setFlipTwo(!flipTwo);
  };

  const handlerFirstForm = e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    handlerFlipOne();
    const obj = {
      doItMySelf: valueDoItMySelf,
      accessoriesDescription: form.get("accessoriesDescription")
    };
    setFirstForm(obj);
    handlerFlipOne();
  };

  const handlerSecondForm = e => {
    e.preventDefault();
    setFisrtCardNotSend(true);
    const form = new FormData(e.currentTarget);
    const obj = {
      bads: form.get("bads"),
      descriptionBeds: form.get("descriptionBeds")
    };
    setSecondForm(obj);
    console.log(obj);
  };

  const handlerThirdForm = e => {
    if (!firstCardNotSend) {
      setErrorCard(true);
    }
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const obj = {
      kitchen: cucina,
      fridge: frigo,
      gas: gas,
      descriptionKitchen: form.get("descriptionKitchen")
    };
    setThirdForm(obj);
    handlerFlipTwo();
  };

  const handlerForm = async e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const obj = {};
    console.log(obj);
    const richiesta = await fetch("http://localhost:8080/vehicles_arrangement", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        doItMySelf: valueDoItMySelf,
        accessoriesDescription: firstForm.accessoriesDescription,
        bads: bads,
        descriptionBeds: secondForm.descriptionBeds,
        kitchen: cucina,
        fridge: frigo,
        gas: gas,
        descriptionKitchen: thirdForm.descriptionKitchen,
        bathroom: bathroom,
        water: water,
        hotWater: hotWater,
        wc: wc,
        descriptionBathroom: form.get("descriptionBathroom")
      })
    });
    if (richiesta.ok) {
      const vehicle = await richiesta.json();
      dispatch(addVehicle(vehicle));
      navigate(`/profile_owner`);
      console.log(vehicle);
    }
  };

  return (
    <>
      <div
        className="Register gradient-background"
        style={{ height: "100vh" }}>
        <div className="d-flex justify-content-between">
          <h1>Allestimento del Van</h1>
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
          <Row className="d-flex flex-grow-1 justify-content-center align-items-center mt-5">
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
                  <Modal.Title>SEI DEI NOSTRI</Modal.Title>
                </ModalHeader>
                <Modal.Body style={{ background: "#051C12", borderColor: "red" }}>
                  Registrazione avvenuta con successo, premi sulla "X" per tornare alla home
                </Modal.Body>
              </Modal>
            )}
            {errorCard && (
              <Modal
                show={errorCard}
                autoFocus
                style={{ color: "#75B798" }}
                onHide={() => {
                  setErrorCard(false);
                }}>
                <ModalHeader
                  style={{ background: "#2C0B0E", borderColor: "#2C0B0E", color: "#DE7E86" }}
                  closeButton
                  closeVariant="white">
                  <Modal.Title>Premi la freccia di invio della prima carta</Modal.Title>
                </ModalHeader>
              </Modal>
            )}

            <Col sm={5}>
              <ReactCardFlip
                isFlipped={flipOne}
                containerClassName="d-flex "
                containerStyle={{}}
                cardStyles={{}}
                flipDirection="horizontal">
                <Card style={{ width: "300px", height: "400px", background: "#00000000", border: "none" }}>
                  <CardHeader
                    className="text-center border-0"
                    style={{ backgroundColor: "#00000000" }}>
                    Descrizione e consigli d'uso
                  </CardHeader>
                  <CardBody>
                    <Row className="d-flex flex-column">
                      <Form
                        onSubmit={handlerFirstForm}
                        id="firstForm">
                        <Col className="d-flex justify-content-center">
                          <Form.Group className="mb-3">
                            <Form.Check
                              type="switch"
                              id="doItMySelf"
                              name="doItMySelf"
                              className="infoAllestito"
                              value={valueDoItMySelf}
                              onChange={e => setValueDoItMySelf(!valueDoItMySelf)}
                              label="Allestito dal proprietario"
                            />
                          </Form.Group>
                        </Col>
                        <Col className="d-flex justify-content-center gap-5">
                          <Form.Group className="mb-3">
                            <Form.Control
                              name="accessoriesDescription"
                              id="accessoriesDescription"
                              as="textarea"
                              rows={6}
                              style={{ background: "#00000000" }}
                              placeholder="Descrivi come vivere al meglio le vacanze col tuo van, e gli accessori presenti"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Form>
                    </Row>
                  </CardBody>
                  <CardFooter
                    className="border-0"
                    style={{ backgroundColor: "#00000000" }}>
                    <div className="d-flex justify-content-center gap-5">
                      <Button
                        style={{ backgroundColor: "#00000000", border: "white", color: "black" }}
                        type="submit"
                        form="firstForm">
                        <HiArrowUturnLeft style={{ cursor: "pointer", fontSize: "1.5em", marginInlineStart: "1rem" }} />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>

                <Card style={{ width: "300px", height: "400px", backgroundColor: "#00000000", border: "none" }}>
                  <CardHeader
                    className=" text-center border-0"
                    style={{ backgroundColor: "#00000000" }}>
                    Come si dorme? <br></br>Qualche info sulla disposizione dei letti
                  </CardHeader>
                  <CardBody>
                    <Form
                      id="secondForm"
                      onSubmit={handlerSecondForm}>
                      <Col className="d-flex justify-content-center">
                        <Form.Group className="mb-3">
                          <FormSelect
                            name="bads"
                            style={{ backgroundColor: "#00000000", border: "none" }}
                            value={bads}
                            onChange={e => setBeds(e.target.value)}
                            id="bads"
                            required>
                            <option>Numero di letti</option>
                            <option value={2}>2 letti</option>
                            <option value={3}>3 letti</option>
                            <option value={4}>4 letti</option>
                            <option value={5}>5 letti</option>
                            <option value={6}>6 letti</option>
                          </FormSelect>
                        </Form.Group>
                      </Col>
                      <Col className="d-flex justify-content-center gap-5">
                        <Form.Group className="mb-3">
                          <Form.Control
                            name="descriptionBeds"
                            id="descriptionBeds"
                            as="textarea"
                            style={{ backgroundColor: "#00000000" }}
                            rows={6}
                            placeholder="Descrivi come vivere al meglio le vacanze col tuo van, e gli accessori presenti"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Form>
                  </CardBody>
                  <CardFooter
                    style={{ backgroundColor: "#00000000" }}
                    className="border-0">
                    <div className="d-flex justify-content-between align-items-center gap-5">
                      {errorCard && <FaRegCircle className="cerchio" />}
                      <FaArrowLeft
                        style={{ cursor: "pointer", fontSize: "1em" }}
                        onClick={() => setFlipOne(!flipOne)}
                      />
                      <Button
                        style={{ backgroundColor: "#00000000", border: "white", color: "black" }}
                        type="submit"
                        form="secondForm">
                        <RiSendPlaneFill style={{ cursor: "pointer", fontSize: "1em" }} />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </ReactCardFlip>
            </Col>
            <Col sm={5}>
              <ReactCardFlip
                isFlipped={flipTwo}
                containerClassName="d-flex"
                containerStyle={{}}
                cardStyles={{}}
                flipDirection="horizontal">
                <Card style={{ width: "300px", height: "400px", backgroundColor: "#00000000", border: "none" }}>
                  <Card.Header
                    className="border-0 text-center"
                    style={{ backgroundColor: "#00000000" }}>
                    La cucina
                  </Card.Header>
                  <Card.Body>
                    <Row className="d-flex flex-column">
                      <Form
                        id="thirdForm"
                        onSubmit={handlerThirdForm}>
                        <Col className="d-flex justify-content-start ms-5">
                          <Form.Group className="mb-3">
                            <Form.Check
                              type="switch"
                              id="kitchen"
                              label="Cucina?"
                              value={cucina}
                              onChange={e => {
                                setCucina(!cucina);
                              }}
                            />
                          </Form.Group>
                        </Col>

                        <Col className="d-flex justify-content-start ms-5">
                          <Form.Group className="mb-3">
                            <Form.Check
                              type="switch"
                              id="fridge"
                              label="Frigo?"
                              value={frigo}
                              onChange={e => {
                                setFrigo(!frigo);
                              }}
                            />
                          </Form.Group>
                        </Col>

                        <Col className="d-flex justify-content-start ms-5">
                          <Form.Group className="mb-3">
                            <Form.Check
                              type="switch"
                              id="gas"
                              label="Gas per cucinare?"
                              value={gas}
                              onChange={e => {
                                setGas(!gas);
                              }}
                            />
                          </Form.Group>
                        </Col>

                        <Col className="d-flex justify-content-center">
                          <Form.Group className="mb-3">
                            <Form.Control
                              style={{ backgroundColor: "#00000000" }}
                              name="descriptionKitchen"
                              id="descriptionKitchen"
                              as="textarea"
                              rows={3}
                              required
                              placeholder="se vuoi aggiungere altro..."
                            />
                          </Form.Group>
                        </Col>
                      </Form>
                    </Row>
                  </Card.Body>
                  <CardFooter
                    style={{ backgroundColor: "#00000000" }}
                    className="border-0">
                    <div className="d-flex justify-content-center gap-5">
                      <Button
                        style={{ backgroundColor: "#00000000", border: "white", color: "black" }}
                        type="submit"
                        form="thirdForm">
                        Compila anche dietro
                        <HiArrowUturnLeft style={{ cursor: "pointer", fontSize: "1.5em", marginInlineStart: "1rem" }} />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>

                <Card style={{ width: "300px", height: "400px", backgroundColor: "#00000000", border: "none" }}>
                  <Card.Header
                    style={{ backgroundColor: "#00000000" }}
                    className="text-center border-0">
                    E infine il bagno
                  </Card.Header>
                  <Card.Body>
                    <Row className="d-flex flex-column">
                      <Form
                        id="fourthForm"
                        onSubmit={handlerForm}>
                        <Col className="d-flex justify-content-center">
                          <Form.Group className="mb-3">
                            <Form.Check
                              type="switch"
                              id="bathroom"
                              value={bathroom}
                              onChange={e => setBathroom(!bathroom)}
                              label="Bagno?"
                            />
                          </Form.Group>
                        </Col>
                        <Col className="d-flex justify-content-center">
                          <Form.Group className="mb-3">
                            <Form.Check
                              type="switch"
                              id="water"
                              value={water}
                              onChange={e => setWater(!water)}
                              label="Acqua portabile?"
                            />
                          </Form.Group>
                        </Col>
                        <Col className="d-flex justify-content-center">
                          <Form.Group className="mb-3">
                            <Form.Check
                              type="switch"
                              id="hotWater"
                              value={hotWater}
                              onChange={e => setHotWater(!hotWater)}
                              label="Acqua calda?"
                            />
                          </Form.Group>
                        </Col>
                        <Col className="d-flex justify-content-center">
                          <Form.Group className="mb-3">
                            <Form.Check
                              type="switch"
                              id="wc"
                              value={wc}
                              onChange={e => setWc(!wc)}
                              label="WC?"
                            />
                          </Form.Group>
                        </Col>
                        <Col className="d-flex justify-content-center">
                          <Form.Group className="mb-3">
                            <Form.Control
                              style={{ backgroundColor: "#00000000" }}
                              name="descriptionBathroom"
                              id="descriptionBathroom"
                              as="textarea"
                              rows={3}
                              required
                              placeholder="se vuoi aggiungere altro..."
                            />
                          </Form.Group>
                        </Col>
                      </Form>
                    </Row>
                  </Card.Body>
                  <CardFooter
                    className="border-0"
                    style={{ backgroundColor: "#00000000" }}>
                    <div className="d-flex justify-content-between align-items-center gap-5">
                      <FaArrowLeft
                        style={{ cursor: "pointer", fontSize: "1em" }}
                        onClick={() => handlerFlipTwo()}
                      />
                      <Button
                        style={{ backgroundColor: "#00000000", border: "white", color: "black" }}
                        type="submit"
                        form="fourthForm">
                        <RiSendPlaneFill style={{ cursor: "pointer", fontSize: "1em" }} />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </ReactCardFlip>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default VehicleArrangement;
