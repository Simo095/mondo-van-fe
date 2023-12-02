import { Button, Col, Container, Form, FormLabel, Row } from "react-bootstrap";
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

const RegisterVehicle = () => {
  const typeForm = ["Camper", "Van", "Jeep attrezzata", "Macchina rooftop", "Altro"];
  const serverEnum = ["CAMPER", "VAN", "CAMPERIZED_JEEP", "ROOFTOOP_CAR", "OTHER"];
  const image = [Camper, Van, Jeep, Rooftop, Altro];
  const [checked, setChecked] = useState([false, false, false, false, false]);
  const [typeServer, setTypeServer] = useState("");

  const token = useSelector(state => state.login.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        name: form.get("name"),
        model: form.get("model"),
        brand: form.get("brand"),
        plate: form.get("plate"),
        supply: form.get("supply"),
        firstEnrollment: form.get("firstEnrollment"),
        license: form.get("license"),
        type: typeServer,
        transmission: form.get("transmission"),
        displacement: form.get("displacement"),
        kilometers: form.get("kilometers"),
        height: form.get("height"),
        width: form.get("width"),
        length: form.get("length")
      })
    });
    if (richiesta.ok) {
      const vehicle = await richiesta.json();
      dispatch(addVehicle(vehicle));
      navigate(`/profile_vehicle/${vehicle.id}`);
    }
  };

  return (
    <div className="RegisterVehicle">
      <NavBar />
      <Container>
        <Row className="row-cols-1 gap-3">
          <Col>
            <h2>Form Registrazione Van</h2>
          </Col>
          <Form onSubmit={handlerForm}>
            <Col>
              <h3>Tipologia</h3>
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
            {/*               */}
            <h2>Ora qualche dato tecnico</h2>
            <Row className="mt-5">
              <Col className="d-flex flex-column">
                <Form.Group className="mb-3">
                  <Form.Control
                    name="name"
                    id="name"
                    type="text"
                    placeholder="Nome..."
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="brand"
                    id="brand"
                    required
                    placeholder="Marca..."
                  />
                </Form.Group>
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
              <Col className=" d-flex flex-column">
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="plate"
                    id="plate"
                    required
                    placeholder="Targa..."
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    name="kilometers"
                    id="kilometers"
                    type="text"
                    required
                    placeholder="KM..."
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select
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
            </Row>
            <Row className="d-flex align-items-end">
              <Col>
                <FormLabel>Data di immatricolazione</FormLabel>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="date"
                    required
                    name="firstEnrollment"
                    id="firstEnrollment"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>Motore</h4>
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
                <Form.Select
                  id="supply"
                  name="supply"
                  required>
                  <option>Seleziona una alimentazione</option>
                  <option value="GASOLINE">Benzina</option>
                  <option value="DIESEL">Diesel</option>
                  <option value="LPG_DIESEL">GPL e Diesel</option>
                </Form.Select>
              </Col>
              <Col>
                <h4>Dimensioni</h4>
                <Form.Group className="mb-3">
                  <Form.Control
                    name="length"
                    id="length"
                    type="text"
                    placeholder="Lunghezza..."
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    name="width"
                    id="width"
                    type="text"
                    placeholder="Larghezza..."
                    required
                  />
                </Form.Group>
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
            </Row>
            <Button
              type="submit"
              variant="outline-success">
              Prosegui
            </Button>
          </Form>
        </Row>
      </Container>
    </div>
  );
};
export default RegisterVehicle;
