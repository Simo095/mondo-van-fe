import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Carousel,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Modal,
  Nav,
  Row,
  Spinner
} from "react-bootstrap";
import NavBar from "../NavBar";
import SideBar from "../SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import cover from "../../assets/user_placeholder.png";

import Calendario from "../Calendario";
import { useNavigate } from "react-router";
import { FaRegPenToSquare } from "react-icons/fa6";
import { RiArrowGoBackLine, RiSendPlaneFill } from "react-icons/ri";
import Dropzone from "react-dropzone";
import { addUser } from "../../redux/actions";

const ProfileVehicle = () => {
  const token = useSelector(state => state.login.token);
  const vehicle = useSelector(state => state.vehicles.vehicle);

  const [date, setDate] = useState(null);
  const [interni, setInterni] = useState(false);
  const [motorizzazione, setMotorizzazione] = useState(false);
  const [creaAnnuncio, setCreaAnnuncio] = useState(true);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [coverImg, setCover] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const modifyCover = () => setShow(true);
  const handleClose = () => setShow(false);
  const handlerSubmitCover = async e => {
    e.preventDefault();
    const formCover = new FormData();
    formCover.append("cover", coverImg[0]);
    setLoading(true);
    if (cover) {
      const coverfetch = await fetch("http://localhost:8080/users/upload_cover", {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token
        },
        body: formCover
      });
      if (coverfetch.ok) {
        await fetchUser();
        setLoading(false);
      }
    }
    handleClose();
  };
  const fetchUser = async () => {
    const respSucces = await fetch("http://localhost:8080/users/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    });
    if (respSucces.ok) {
      const user = await respSucces.json();
      console.log(user);
      dispatch(addUser(user));
      if (user.role === "CUSTOMER") {
        navigate("/profile_customer");
      }
      if (user.role === "OWNER") {
        navigate("/profile_owner");
      }
    }
  };

  const fetchDisponibilita = async () => {
    const disponibilita = await fetch("http://localhost:8080/availability/my_availability", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    });
    if (disponibilita.ok) {
      const obj = await disponibilita.json();
      const key = Object.keys(obj);
      const array = key.map(k => obj[k]);
      setDate(array);
    }
  };

  useEffect(() => {
    fetchDisponibilita();
  }, []);

  return (
    <div className="ProfileVehicle">
      <Container fluid>
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>Immagine di copertina</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              id="drop"
              className="d-flex justify-content-center "
              onSubmit={handlerSubmitCover}>
              <Dropzone
                onDrop={acceptedFiles => {
                  setCover(acceptedFiles);
                }}>
                {({ getRootProps, getInputProps, acceptedFiles }) => (
                  <>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div
                        style={{
                          border: "3px",
                          borderStyle: "dashed",
                          borderRadius: "30px",
                          borderColor: "ActiveBorder"
                        }}
                        className="text-center">
                        {acceptedFiles[0]
                          ? acceptedFiles[0].path
                          : "Tracina l'immagine che desideri come cover \noppure clicca sul qui per aprire explore e selezionarla"}
                      </div>
                      {loading ? (
                        <Spinner
                          animation="border"
                          className="mt-5"
                          variant="success"
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                )}
              </Dropzone>
            </Form>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <RiArrowGoBackLine
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
            <Button
              style={{ background: "white", border: "white" }}
              type="submit"
              form="drop">
              <RiSendPlaneFill style={{ cursor: "pointer", color: "blue" }} />
            </Button>
          </Modal.Footer>
        </Modal>
        <Row>
          <Col sm={2}>
            <SideBar />
          </Col>
          <Col sm={5}>
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
                    <Carousel
                      interval={null}
                      indicators={false}>
                      <Carousel.Item>
                        <div
                          className="d-flex justify-content-end"
                          style={{
                            backgroundImage: `url(${vehicle.avatar[0] ? vehicle.avatar[0] : cover})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: "10px",
                            height: "50vh"
                          }}>
                          <div
                            className="d-flex align-items-start justify-content-center"
                            style={{
                              backgroundColor: "black",
                              opacity: "0.3",
                              borderRadius: "30px",
                              height: "40px",
                              width: "40px"
                            }}>
                            <FaRegPenToSquare
                              className="mt-2"
                              onClick={modifyCover}
                              style={{
                                cursor: "pointer",
                                opacity: "0.5",
                                fontSize: "1.5em",
                                color: "white"
                              }}
                            />
                          </div>
                        </div>
                        <Carousel.Caption></Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item>
                        <div
                          className="d-flex justify-content-end"
                          style={{
                            backgroundImage: `url(${vehicle.avatar[1] ? vehicle.avatar[1] : cover})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: "10px",
                            height: "50vh"
                          }}>
                          <div
                            className="d-flex align-items-start justify-content-center"
                            style={{
                              backgroundColor: "black",
                              opacity: "0.3",
                              borderRadius: "30px",
                              height: "40px",
                              width: "40px"
                            }}>
                            <FaRegPenToSquare
                              className="mt-2"
                              onClick={modifyCover}
                              style={{
                                cursor: "pointer",
                                opacity: "0.5",
                                fontSize: "1.5em",
                                color: "white"
                              }}
                            />
                          </div>
                        </div>
                        <Carousel.Caption></Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item>
                        <div
                          className="d-flex justify-content-end"
                          style={{
                            backgroundImage: `url(${vehicle.avatar[2] ? vehicle.avatar[2] : cover})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: "10px",
                            height: "50vh"
                          }}>
                          <div
                            className="d-flex align-items-start justify-content-center"
                            style={{
                              backgroundColor: "black",
                              opacity: "0.3",
                              borderRadius: "30px",
                              height: "40px",
                              width: "40px"
                            }}>
                            <FaRegPenToSquare
                              className="mt-2"
                              onClick={modifyCover}
                              style={{
                                cursor: "pointer",
                                opacity: "0.5",
                                fontSize: "1.5em",
                                color: "white"
                              }}
                            />
                          </div>
                        </div>
                        <Carousel.Caption></Carousel.Caption>
                      </Carousel.Item>
                    </Carousel>
                  </Col>

                  <Col sm={8}>
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
                                  setCreaAnnuncio(true);
                                  setMotorizzazione(false);
                                  setInterni(false);
                                }}>
                                <Nav.Link>Crea l'annuncio</Nav.Link>
                              </Nav.Item>
                              <Nav.Item
                                className="navItemsVehicle"
                                onClick={() => {
                                  setMotorizzazione(true);
                                  setCreaAnnuncio(false);
                                  setInterni(false);
                                }}>
                                <Nav.Link>Motorizzazione</Nav.Link>
                              </Nav.Item>
                              <Nav.Item
                                className="navItemsVehicle"
                                onClick={() => {
                                  setMotorizzazione(false);
                                  setCreaAnnuncio(false);
                                  setInterni(true);
                                }}>
                                <Nav.Link>Interni</Nav.Link>
                              </Nav.Item>
                            </Nav>
                          </Card.Header>
                          {creaAnnuncio && creaAnnuncio && (
                            <CardBody>
                              <Card.Title>Annuncio</Card.Title>
                              <Card.Text>In arrivo</Card.Text>
                            </CardBody>
                          )}
                          {motorizzazione && vehicle && (
                            <>
                              <Card.Body className="">
                                <Row className="row-cols-2 gap-2 mt-3">
                                  <Col
                                    sm={3}
                                    className="d-flex gap-5">
                                    <Card>
                                      <Card.Text>{vehicle.brand}</Card.Text>
                                      <Card.Text>{vehicle.model}</Card.Text>
                                      <Card.Text>Username: {vehicle.name}</Card.Text>
                                    </Card>
                                  </Col>
                                  <Col className="d-flex gap-5">
                                    <Card>
                                      <Card.Text>Cilindrata: {vehicle.displacement}</Card.Text>
                                      <Card.Text>Kilometri: {vehicle.kilometers}</Card.Text>
                                      <Card.Text>Patente: {vehicle.license}</Card.Text>
                                      <Card.Text>
                                        Cambio:{" "}
                                        {vehicle.transmission === "MANUAL"
                                          ? "MANUALE"
                                          : vehicle.transmission === "AUTO"
                                          ? "AUTOMATICO"
                                          : vehicle.transmission === "SEMI_AUTO"
                                          ? "SEMI AUTOMATICO"
                                          : ""}
                                      </Card.Text>
                                    </Card>
                                  </Col>
                                  <h5>Dimensioni</h5>
                                  <Col className="d-flex gap-5">
                                    <Card.Text>Altezza: {vehicle.height}m</Card.Text>
                                    <Card.Text>Larghezza: {vehicle.width}m</Card.Text>
                                    <Card.Text>Lunghezza: {vehicle.length}m</Card.Text>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </>
                          )}

                          {interni ? (
                            vehicle.vehiclesArrangement ? (
                              <>
                                <Card.Body>
                                  <Card.Title>{vehicle.vehiclesArrangement.accessoriesDescription}</Card.Title>
                                  <Card.Text>
                                    Allestito da me:{" "}
                                    {vehicle.vehiclesArrangement.doItMySelf
                                      ? "Si, con tanto amore"
                                      : "No, comprato e tutto omologato"}
                                  </Card.Text>
                                  <Card.Title>Sistemazione letti</Card.Title>
                                  <Card.Text>Numero di letti: {vehicle.vehiclesArrangement.bads}</Card.Text>
                                  <Card.Text>{vehicle.vehiclesArrangement.descriptionBeds}</Card.Text>
                                  <Card.Title>Cucina</Card.Title>
                                  <Card.Text>
                                    {vehicle.vehiclesArrangement.doItMySelf
                                      ? "Si, con tanto amore"
                                      : "No, comprato e tutto omologato"}
                                  </Card.Text>
                                  <Card.Text></Card.Text>
                                  <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
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
