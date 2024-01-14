import { Button, Col, Container, Form, FormSelect, Image, Modal, ModalHeader, Row } from "react-bootstrap";

import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useSelector } from "react-redux";

import logo from "../../assets/img/LogoVanWorld.png";
import { ImCancelCircle } from "react-icons/im";
import { FaFileUpload } from "react-icons/fa";
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

  const navigate = useNavigate();

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
      navigate(`/change_vehicle`);
    }
  };

  return (
    <div
      className="RegisterVan"
      style={{ background: "linear-gradient(180deg, #144658, #144658)" }}>
      <div className="d-flex justify-content-between position-relative">
        <h1 className="text-white">Allestimento del Van</h1>
        <div className="d-flex align-items-center">
          <IoArrowBackCircleOutline
            onClick={() => {
              navigate(-1);
            }}
            color="white"
            className="fs-1"
            style={{ cursor: "pointer", zIndex: "1" }}
          />
        </div>
      </div>
      <Container fluid>
        {/* justify-content-center align-items-center */}
        <Container
          className="d-flex con-stile"
          fluid
          style={{
            backgroundImage: `url(${logo})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "1500px",
            backgroundPosition: "center"
          }}>
          {rispOk && (
            <Modal
              show={rispOk}
              autoFocus
              style={{ color: "#75B798" }}
              onHide={() => {
                setRispOk(false);
                navigate(-1);
              }}>
              <ModalHeader
                style={{ background: "#051C12", borderColor: "green" }}
                closeButton
                closeVariant="white">
                <Modal.Title>Registrazione avvenuta con successo!</Modal.Title>
              </ModalHeader>
              <Modal.Body style={{ background: "#051C12", borderColor: "red" }}>
                Bene, ora il Van ha delle descrizioni dettagliate!
              </Modal.Body>
            </Modal>
          )}

          <Container
            className="col-image-logo"
            style={{
              backgroundImage: `url(${logo})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "250px"
            }}>
            <p className="p-stile text-white">
              Descrivi in modo dettagliato e accattivante l'allestimento del tuo Van, rendendolo ancora più appetibile
              per i viaggiatori.<br></br>
              <br></br>Utilizza un linguaggio semplice e coinvolgente, raccontando le peculiarità del tuo Van e
              rendendolo il più desiderabile possibile per i viaggiatori.
            </p>
          </Container>
          <Container>
            <Form
              id="formArrangement"
              onSubmit={handlerForm}>
              <Row className="d-flex row-cols-2 justify-content-center fontRow">
                <Col className="ColArrangement">
                  <h4>
                    <b>Accessori</b>
                  </h4>
                  <p className="m-0 p-0">
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
                      className="fontRow rowSelect"
                      rows={5}
                      style={{ background: "#ffffff90" }}
                      placeholder="Scrivi qui..."
                      required
                    />
                  </Form.Group>
                </Col>
                <Col className="ColArrangement ">
                  <h4>
                    <b>Disposizione notte</b>
                  </h4>
                  <p className="m-0 p-0">
                    Illustra come sono disposti i letti all'interno del Van e il numero di persone che possono dormire.
                  </p>
                  <Form.Group className=" my-3 d-flex">
                    <FormSelect
                      name="bads"
                      style={{ backgroundColor: "#00000000", border: "none" }}
                      value={bads}
                      onChange={e => setBeds(e.target.value)}
                      id="bads"
                      className="fontRow"
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
                      style={{ backgroundColor: "#ffffff90" }}
                      rows={5}
                      className="fontRow rowSelect"
                      placeholder="Scrivi qui..."
                      required
                    />
                  </Form.Group>
                </Col>
                <Col className="ColArrangement">
                  <h4>
                    <b>Cucina</b>
                  </h4>
                  <p className="m-0 p-0">
                    Descrivi la cucina del tuo Van, specificando se è presente un frigo, un fornello a gas o altri
                    elettrodomestici utili per cucinare.
                  </p>
                  <Form.Group className="mb-2 d-flex gap-3">
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
                      style={{ backgroundColor: "#ffffff90" }}
                      name="descriptionKitchen"
                      id="descriptionKitchen"
                      as="textarea"
                      rows={5}
                      className="fontRow rowSelect"
                      required
                      placeholder="Scrivi qui...."
                    />
                  </Form.Group>
                </Col>
                <Col className="ColArrangement">
                  <h4>
                    <b>Bagno</b>
                  </h4>
                  <p className="mb-4 p-0">
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
                      style={{ backgroundColor: "#ffffff90" }}
                      name="descriptionBathroom"
                      id="descriptionBathroom"
                      as="textarea"
                      rows={5}
                      className="fontRow rowSelect"
                      required
                      placeholder="Scrivi qui...."
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col
                  xs={4}
                  className="text-end">
                  <ImCancelCircle
                    fontSize={50}
                    onClick={() => navigate(-1)}
                    style={{ cursor: "pointer", color: "#fff" }}
                  />
                </Col>
                <Col
                  xs={8}
                  className="text-center">
                  <Button
                    style={{ background: "none", border: "none" }}
                    type="submit"
                    form="formArrangement">
                    <FaFileUpload
                      fontSize={50}
                      style={{ cursor: "pointer", color: "#fff" }}
                    />
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </Container>
      </Container>
    </div>
  );
};
export default VehicleArrangement;
