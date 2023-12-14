import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormSelect,
  Image,
  Modal,
  ModalHeader,
  Row
} from "react-bootstrap";

import ReactCardFlip from "react-card-flip";

import { RiSendPlaneFill } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVehicle } from "../../redux/actions";
import logo from "../../assets/LogoVanWorld.png";
const VehicleArrangement = () => {
  const [rispOk, setRispOk] = useState(false);

  const [valueDoItMySelf, setValueDoItMySelf] = useState(false);
  const [bads, setBeds] = useState();
  const [cucina, setCucina] = useState(false);
  const [frigo, setFrigo] = useState(false);
  const [gas, setGas] = useState(false);
  const [bathroom, setBathroom] = useState(false);
  const [water, setWater] = useState(false);
  const [hotWater, setHotWater] = useState(false);
  const [wc, setWc] = useState(false);

  const token = useSelector(state => state.login.token);
  const vehicle = useSelector(state => state.vehicles.vehicle);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerForm = async e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const richiesta = await fetch("http://localhost:8080/vehicles_arrangement", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        doItMySelf: valueDoItMySelf,
        accessoriesDescription: form.get("accessoriesDescription"),
        bads: form.get("bads") === "Numero di letti" ? 0 : form.get("bads"),
        descriptionBeds: form.get("descriptionBeds"),
        kitchen: cucina,
        fridge: frigo,
        gas: gas,
        descriptionKitchen: form.get("descriptionKitchen"),
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
    <div className="Register">
      <div className="d-flex justify-content-between position-relative">
        <h1>Allestimento del Van</h1>

        <div className="d-flex align-items-center">
          <IoArrowBackCircleOutline
            onClick={() => {
              navigate("/");
            }}
            className="fs-1"
            style={{ cursor: "pointer", zIndex: "1" }}
          />
        </div>
      </div>
      <Container fluid>
        {/* justify-content-center align-items-center */}
        <Row
          className=" d-flex   mt-5"
          style={{ height: "100vh" }}>
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
                <Modal.Title>Bene, ora il Van ha delle descrizioni dettagliate!</Modal.Title>
              </ModalHeader>
              <Modal.Body style={{ background: "#051C12", borderColor: "red" }}>
                Registrazione avvenuta con successo, premi sulla "X" per tornare alla home
              </Modal.Body>
            </Modal>
          )}

          <Col
            className="col-stile"
            style={{
              backgroundImage: `url(${logo})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              position: "relative"
            }}
            sm={3}>
            <p
              className="p-stile"
              style={{ position: "relative", top: "20vw" }}>
              Descrivi in modo dettagliato e accattivante l'allestimento del tuo Van, rendendolo ancora più appetibile
              per i viaggiatori.<br></br>
              <br></br>Utilizza un linguaggio semplice e coinvolgente, raccontando le peculiarità del tuo Van e
              rendendolo il più desiderabile possibile per i viaggiatori.
            </p>
          </Col>
          <Col>
            <Form
              id="formArrangement"
              onSubmit={handlerForm}
              className="FormArrangement">
              <Row
                className="justify-content-center align-items-center"
                xs={1}
                md={2}>
                <Col className="ColArrangement">
                  <h4>Accessori</h4>
                  <p>
                    Cita tutti gli accessori presenti nel tuo Van, sottolineando quelli più particolari o utili per i
                    viaggi.
                  </p>
                  <Form.Group className="d-flex my-4">
                    <Form.Check
                      type="switch"
                      id="doItMySelf"
                      name="doItMySelf"
                      className="infoAllestito"
                      value={valueDoItMySelf}
                      onChange={e => setValueDoItMySelf(!valueDoItMySelf)}
                      label="Allestito dal proprietario?"
                    />
                  </Form.Group>
                  <Form.Group className="d-flex">
                    <Form.Control
                      name="accessoriesDescription"
                      id="accessoriesDescription"
                      as="textarea"
                      rows={5}
                      style={{ background: "#00000000" }}
                      placeholder="Scrivi qui..."
                      required
                    />
                  </Form.Group>
                </Col>
                <Col className="ColArrangement">
                  <h3>Disposizione notte</h3>
                  <p>
                    Illustra come sono disposti i letti all'interno del Van e il numero di persone che possono dormire
                    comodamente.
                  </p>
                  <Form.Group className=" my-3 d-flex">
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
                  <Form.Group className="d-flex">
                    <Form.Control
                      name="descriptionBeds"
                      id="descriptionBeds"
                      as="textarea"
                      style={{ backgroundColor: "#00000000" }}
                      rows={5}
                      placeholder="Scrivi qui..."
                      required
                    />
                  </Form.Group>
                </Col>
                <Col className="ColArrangement">
                  <h5>Cucina</h5>
                  <p>
                    Descrivi la cucina del tuo Van, specificando se è presente un frigo, un fornello a gas o altri
                    elettrodomestici utili per cucinare.
                  </p>
                  <Form.Group className="mb-2 d-flex">
                    <Form.Check
                      type="switch"
                      id="kitchen"
                      label="Cucina?"
                      value={cucina}
                      onChange={e => {
                        setCucina(!cucina);
                      }}
                    />
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
                  <Form.Group className="mb-2 d-flex">
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
                  <Form.Group className="d-flex">
                    <Form.Control
                      style={{ backgroundColor: "#00000000" }}
                      name="descriptionKitchen"
                      id="descriptionKitchen"
                      as="textarea"
                      rows={5}
                      required
                      placeholder="Scrivi qui...."
                    />
                  </Form.Group>
                </Col>
                <Col className="ColArrangement">
                  <h3>Bagno</h3>
                  <p>
                    Indica se il tuo Van è dotato di bagno, WC, acqua calda o altri accessori per l'igiene personale.
                  </p>
                  <Form.Group className="d-flex mb-2 gap-3">
                    <Form.Check
                      type="switch"
                      id="bathroom"
                      value={bathroom}
                      onChange={e => setBathroom(!bathroom)}
                      label="Bagno?"
                    />
                    <Form.Check
                      type="switch"
                      id="wc"
                      value={wc}
                      onChange={e => setWc(!wc)}
                      label="WC?"
                    />
                  </Form.Group>
                  <Form.Group className="d-flex mb-2 gap-3">
                    <Form.Check
                      type="switch"
                      id="hotWater"
                      value={hotWater}
                      onChange={e => setHotWater(!hotWater)}
                      label="Acqua calda?"
                    />
                    <Form.Check
                      type="switch"
                      id="water"
                      name="water"
                      value={water}
                      onChange={e => setWater(!water)}
                      label="Acqua portabile?"
                    />
                  </Form.Group>
                  <Form.Group className="d-flex">
                    <Form.Control
                      style={{ backgroundColor: "#00000000" }}
                      name="descriptionBathroom"
                      id="descriptionBathroom"
                      as="textarea"
                      rows={5}
                      required
                      placeholder="Scrivi qui...."
                    />
                  </Form.Group>
                </Col>
                <Button
                  className="mt-5"
                  type="submit"
                  form="formArrangement">
                  Crea
                </Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default VehicleArrangement;
