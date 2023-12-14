import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardText, CardTitle, Col, Container, Form, Image, Nav, Row } from "react-bootstrap";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import { MdHeight } from "react-icons/md";
import { PiEngineBold } from "react-icons/pi";
import { RxWidth } from "react-icons/rx";
import { SlSpeedometer } from "react-icons/sl";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import CardInterni from "../veicolo/CardInterni";
import CaruselVehicle from "../veicolo/CaruselVehicle";
import cover from "../../assets/user_placeholder.png";
import cambio from "../../assets/Cambio.png";
import patente from "../../assets/Patente.png";
import cintura from "../../assets/cinturaSicurezza.png";

const Result = () => {
  const token = useSelector(state => state.login.token);
  const logged = useSelector(state => state.result.logged);
  const startDate = useSelector(state => state.result.startDate);
  const endDate = useSelector(state => state.result.endDate);
  const params = useParams();

  const [interni, setInterni] = useState(false);
  const [motorizzazione, setMotorizzazione] = useState(true);
  const [prenotazione, setPrenotazione] = useState(false);
  const [annuncio, setAnnuncio] = useState(false);
  const [vehicle, setVehicle] = useState();
  const [diff, setDiff] = useState();

  const navigate = useNavigate();

  const vehicleFetchDetail = async () => {
    if (logged) {
      const vehicle = await fetch(`http://localhost:8080/vehicles/result/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (vehicle.ok) {
        const vehicleData = await vehicle.json();
        setVehicle(vehicleData);
      }
    } else {
      navigate("/register");
    }
  };

  const calcolaGiorni = () => {
    if (startDate && endDate) {
      const d1 = new Date(startDate);
      const d2 = new Date(endDate);
      const diff = Math.abs(d2.getTime() - d1.getTime()) / (1000 * 3600 * 24) + 1;
      setDiff(diff);
    }
  };

  const handlerSubmit = async e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const messaggio = form.get("messaggio");
    const notifica = await fetch("http://localhost:8080/notifications/for_reservation", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        text: messaggio,
        object:
          "Richiesta di prenotazione dal " +
          startDate +
          " al " +
          endDate +
          " al prezzo di " +
          vehicle.pricePerDay * diff +
          "€",
        receiver: vehicle.id
      })
    });
    if (notifica.ok) {
      const reservation = await fetch(`http://localhost:8080/reservations/${vehicle.id}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "content-type": "application/json"
        },
        body: JSON.stringify({
          start: startDate,
          end: endDate
        })
      });
      if (reservation.ok) {
        console.log("Ok");
      }
    }
  };

  useEffect(() => {
    vehicleFetchDetail();
    if (startDate && endDate) {
      calcolaGiorni();
    }
  }, []);

  return (
    <>
      {vehicle ? (
        <Container sm={8}>
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
                    height={600}
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
                                setMotorizzazione(true);
                                setInterni(false);
                                setPrenotazione(false);
                                setAnnuncio(false);
                              }}>
                              <Nav.Link>Motorizzazione</Nav.Link>
                            </Nav.Item>
                            <Nav.Item
                              className="navItemsVehicle"
                              onClick={() => {
                                setMotorizzazione(false);
                                setInterni(true);
                                setPrenotazione(false);
                                setAnnuncio(false);
                              }}>
                              <Nav.Link>Interni</Nav.Link>
                            </Nav.Item>
                            <Nav.Item
                              className="navItemsVehicle"
                              onClick={() => {
                                setMotorizzazione(false);
                                setInterni(false);
                                setPrenotazione(false);
                                setAnnuncio(true);
                              }}>
                              <Nav.Link>Annuncio</Nav.Link>
                            </Nav.Item>
                            <Nav.Item
                              className="navItemsVehicle"
                              onClick={() => {
                                setMotorizzazione(false);
                                setInterni(false);
                                setPrenotazione(true);
                                setAnnuncio(false);
                              }}>
                              <Nav.Link>Prenotazione</Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Card.Header>

                        {motorizzazione && vehicle && (
                          <>
                            <Card.Body className="">
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
                          </>
                        )}

                        {interni && vehicle && (
                          <Card.Body>
                            <CardInterni vehicle={vehicle}></CardInterni>
                          </Card.Body>
                        )}
                        {annuncio && <CardBody>Annuncio</CardBody>}
                        {prenotazione && (
                          <CardBody>
                            <CardTitle>Prenota</CardTitle>
                            <CardText>
                              dal {startDate.substring(5, 11).split("-").reverse().join("-")} al{" "}
                              {endDate.substring(5, 11).split("-").reverse().join("-")} al prezzo di{" "}
                              {vehicle.pricePerDay * diff} €
                            </CardText>
                            <Row className="d-flex flex-column">
                              <Form onSubmit={handlerSubmit}>
                                <Col className="d-flex justify-content-center gap-5">
                                  <Form.Group className="mb-3">
                                    <Form.Control
                                      name="messaggio"
                                      id="messaggio"
                                      as="textarea"
                                      style={{ backgroundColor: "#00000000" }}
                                      rows={6}
                                      placeholder="Mettiti in contatto col proprietario del van!"
                                      required
                                    />
                                  </Form.Group>
                                </Col>
                                <Col className="d-flex justify-content-center gap-5">
                                  <Button type="submit">Invia</Button>
                                </Col>
                              </Form>
                            </Row>
                          </CardBody>
                        )}
                      </Card>
                    </>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};
export default Result;
