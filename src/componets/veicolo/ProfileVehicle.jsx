import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Carousel,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  Image,
  Modal,
  Nav,
  Row,
  Spinner
} from "react-bootstrap";
import SideBar from "../../componets/stucture/SideBar";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { addVehicle } from "../../redux/actions";
import { PiEngineBold } from "react-icons/pi";
import { SlSpeedometer } from "react-icons/sl";
import { RxWidth } from "react-icons/rx";
import { MdHeight } from "react-icons/md";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import cover from "../../assets/user_placeholder.png";
import cambio from "../../assets/Cambio.png";
import patente from "../../assets/Patente.png";
import cintura from "../../assets/cinturaSicurezza.png";
import CaruselVehicle from "./CaruselVehicle";
import CardInterni from "./CardInterni";

const ProfileVehicle = () => {
  const token = useSelector(state => state.login.token);
  const vehicle = useSelector(state => state.vehicles.vehicle);

  const [interni, setInterni] = useState(false);
  const [motorizzazione, setMotorizzazione] = useState(false);
  const [creaAnnuncio, setCreaAnnuncio] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerForm = async e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const request = await fetch("http://localhost:8080/vehicles/announcement", {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json"
      },
      body: JSON.stringify({ announcement: form.get("annuncio") })
    });
    if (request.ok) {
      const vehicle = await request.json();
      dispatch(addVehicle(vehicle));
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="ProfileVehicle">
      <Container fluid>
        <Row>
          <Col sm={2}>
            <SideBar />
          </Col>
          <Col sm={8}>
            <Row
              style={{ height: "100vh" }}
              className="d-flex oV overflow-y-scroll">
              <Col>
                <Row className="d-flex flex-column align-items-center mt-5">
                  <h4>
                    {vehicle.name}
                    {" - "}
                    {vehicle.type === "CAMPERIZED_JEEP"
                      ? "JEEP ATTREZZATA"
                      : vehicle.type === "ROOFTOOP_CAR"
                      ? "MACCHINA ATTREZZATA"
                      : vehicle.type === "VAN"
                      ? "VAN"
                      : vehicle.type === "CAMPER"
                      ? "CAMPER"
                      : vehicle.type === "OTHER"
                      ? "ALTRO"
                      : ""}
                    {" - "}
                    {vehicle.shortDescriptions ? vehicle.shortDescriptions : ""}
                  </h4>
                  <Col className="mb-3">
                    <CaruselVehicle
                      vehicle={vehicle}
                      cover={cover}
                      token={token}
                      height={500}
                    />
                  </Col>

                  <Col>
                    {vehicle && (
                      <>
                        <Card>
                          <Card.Header style={{ backgroundColor: "white" }}>
                            <Nav
                              variant="tabs"
                              defaultActiveKey="#first">
                              <Nav.Item
                                className="navItemsVehicle"
                                onClick={() => {
                                  window.scrollTo(0, document.body.scrollHeight);
                                  setCreaAnnuncio(true);
                                  setMotorizzazione(false);
                                  setInterni(false);
                                }}>
                                <Nav.Link href="#annuncio">Annuncio</Nav.Link>
                              </Nav.Item>
                              <Nav.Item
                                className="navItemsVehicle"
                                onClick={() => {
                                  window.scrollTo(0, document.body.scrollHeight);
                                  setMotorizzazione(true);
                                  setCreaAnnuncio(false);
                                  setInterni(false);
                                }}>
                                <Nav.Link href="#motorizzazione">Motorizzazione</Nav.Link>
                              </Nav.Item>
                              <Nav.Item
                                className="navItemsVehicle"
                                onClick={() => {
                                  window.scrollTo(0, document.body.scrollHeight);
                                  setMotorizzazione(false);
                                  setCreaAnnuncio(false);
                                  setInterni(true);
                                }}>
                                <Nav.Link href="#interni">Interni</Nav.Link>
                              </Nav.Item>
                            </Nav>
                          </Card.Header>
                          {creaAnnuncio ? (
                            vehicle.announcement ? (
                              <>
                                <CardBody id="annuncio">
                                  <Card.Title>Annuncio</Card.Title>
                                  <Row>
                                    <Col>
                                      <p>{vehicle.announcement}</p>
                                    </Col>
                                  </Row>
                                </CardBody>
                                <CardFooter style={{ height: "100px" }}>Modifica</CardFooter>
                              </>
                            ) : (
                              <>
                                <CardBody>
                                  <Card.Title>Annuncio</Card.Title>
                                  <Row>
                                    <Col>
                                      <Form
                                        id="formAnnuncio"
                                        onSubmit={handlerForm}>
                                        <FormGroup>
                                          <Form.Control
                                            name="annuncio"
                                            id="annuncio"
                                            as="textarea"
                                            style={{ backgroundColor: "#00000000" }}
                                            rows={6}
                                            placeholder="Scrivi l'annuncio che visualizzeranno i van travelers"
                                            required
                                          />
                                        </FormGroup>
                                        <Button
                                          type="submit"
                                          form="formAnnuncio">
                                          Crea
                                        </Button>
                                      </Form>
                                    </Col>
                                  </Row>
                                </CardBody>
                              </>
                            )
                          ) : (
                            <></>
                          )}

                          {motorizzazione && vehicle && (
                            <>
                              <Card.Body
                                id="motorizzazione"
                                className="">
                                <Row className="row-cols-1">
                                  <Col className="d-flex mb-4">
                                    <Card.Title>
                                      {vehicle.brand} - {vehicle.model} - Username: {vehicle.name}
                                    </Card.Title>
                                  </Col>
                                  <Col>
                                    <Row>
                                      <Col className="d-flex flex-column">
                                        <Row className="mb-3">
                                          <Col
                                            sm={3}
                                            className="d-flex flex-column gap-1 align-items-center justify-content-centet">
                                            <SlSpeedometer fontSize={40} />
                                            <Card.Text>{vehicle.kilometers} KM</Card.Text>
                                          </Col>

                                          <Col
                                            sm={3}
                                            className="d-flex flex-column gap-1 align-items-center justify-content-centet">
                                            <CiCalendar fontSize={40} />
                                            <Card.Text>{vehicle.firstEnrollment.substring(0, 4)}</Card.Text>
                                          </Col>

                                          <Col
                                            sm={3}
                                            className="d-flex mt-1 flex-column gap-2 align-items-center justify-content-centet">
                                            <Image
                                              style={{ width: "45px" }}
                                              src={patente}
                                            />
                                            <Card.Text>{vehicle.license}</Card.Text>
                                          </Col>
                                          <Col
                                            sm={3}
                                            className="d-flex flex-column gap-1 align-items-center justify-content-centet">
                                            <Image
                                              style={{ width: "38px" }}
                                              src={cintura}
                                            />
                                            <Card.Text>{vehicle.sits}</Card.Text>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col
                                            sm={3}
                                            className="d-flex flex-column gap-1 align-items-center justify-content-centet">
                                            <PiEngineBold fontSize={40} />
                                            <Card.Text>
                                              {vehicle.displacement} cm<sup>3</sup>
                                            </Card.Text>
                                          </Col>
                                          <Col
                                            sm={3}
                                            className="d-flex flex-column gap-2 align-items-center justify-content-centet">
                                            <BsFillFuelPumpFill fontSize={37} />
                                            <Card.Text>{vehicle.supply}</Card.Text>
                                          </Col>
                                          <Col
                                            sm={3}
                                            className="d-flex flex-column gap-1 align-items-center justify-content-centet">
                                            <Image
                                              style={{ width: "35px" }}
                                              src={cambio}
                                            />
                                            <Card.Text>
                                              {vehicle.transmission === "MANUAL"
                                                ? "MANUALE"
                                                : vehicle.transmission === "AUTO"
                                                ? "AUTOMATICO"
                                                : vehicle.transmission === "SEMI_AUTO"
                                                ? "SEMI AUTOMATICO"
                                                : ""}
                                            </Card.Text>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <CardTitle>Sagoma veicolo</CardTitle>
                                          <Col
                                            sm={3}
                                            className="d-flex flex-column gap-1 align-items-center justify-content-centet">
                                            <MdHeight fontSize={40} />
                                            <Card.Text>{vehicle.height}m</Card.Text>
                                          </Col>

                                          <Col
                                            sm={3}
                                            className="d-flex flex-column gap-1 align-items-center justify-content-centet">
                                            <RxWidth fontSize={40} />
                                            <Card.Text>{vehicle.length}m</Card.Text>
                                          </Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Card.Body>
                              <CardFooter style={{ height: "100px" }}>Modifica</CardFooter>
                            </>
                          )}

                          {interni ? (
                            vehicle.vehiclesArrangement ? (
                              <>
                                <Card.Body id="interni">
                                  <CardInterni vehicle={vehicle}></CardInterni>
                                </Card.Body>
                                <CardFooter style={{ height: "100px" }}>Modifica</CardFooter>
                              </>
                            ) : (
                              <>
                                <Card.Body>
                                  <Card.Title>Interni</Card.Title>
                                  <Card.Text>
                                    Inserisci qualche dato in piu sul tuo Van per metterlo in noleggio
                                  </Card.Text>
                                  <CardFooter>
                                    <Button
                                      onClick={() => {
                                        navigate("/vehicle_arrangement");
                                      }}
                                      variant="primary">
                                      Vai alla configurazione
                                    </Button>
                                  </CardFooter>
                                </Card.Body>
                              </>
                            )
                          ) : (
                            <></>
                          )}
                        </Card>
                      </>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default ProfileVehicle;
