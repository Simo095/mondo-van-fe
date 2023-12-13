import { Button, Card, CardHeader, CardTitle, Col, Container, Form, Modal, Nav, Row, Spinner } from "react-bootstrap";
import { FaRegPenToSquare } from "react-icons/fa6";
import CardPrenotazioni from "./CardPrenotazioni";
import cover from "../../assets/user_placeholder.png";
import SideBar from "../SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Calendario from "../Calendario";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router";
import { RiArrowGoBackLine, RiSendPlaneFill } from "react-icons/ri";
import Notifiche from "./Notifiche";
import { fetchUser, fetchVehicle } from "../../redux/actions/fetchActions";

const ProfileOwner = () => {
  const user = useSelector(state => state.login.user);
  const token = useSelector(state => state.login.token);
  const vehicle = useSelector(state => state.vehicles.vehicle);
  const [date, setDate] = useState(null);
  const [idDispo, setIdDispo] = useState(null);
  const [show, setShow] = useState(false);
  const [coverImg, setCover] = useState(null);
  const [loading, setLoading] = useState(false);
  const [calendario, setCalendario] = useState(true);
  const [altro, setAltro] = useState(false);
  const [notifiche, setNotifiche] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const modifyCover = () => setShow(true);

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
        await dispatch(fetchUser(token));
        setLoading(false);
      }
    }
    handleClose();
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
      setIdDispo(key);
    }
  };

  const fetchNotifiche = async () => {
    const risp = await fetch("http://localhost:8080/notifications", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    });
    if (risp.ok) {
      const notifiche = await risp.json();
      setNotifiche(notifiche);
    }
  };

  useEffect(() => {
    dispatch(fetchVehicle(token));
    fetchDisponibilita();
    fetchNotifiche();
  }, []);
  return (
    <div className="ProfileOwner">
      <Container
        fluid
        className="d-flex flex-column flex-nowrap gap-5">
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
        {user ? (
          <>
            <Row className="d-flex flex-nowrap mt-5">
              <Col sm={2}>
                <SideBar />
              </Col>
              <Col
                style={{ height: "100vh" }}
                className="d-flex oV overflow-y-scroll">
                <Row className="d-flex">
                  <Col
                    className="d-flex justify-content-end"
                    style={{
                      backgroundImage: `url(${user.cover})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "30px",
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
                  </Col>

                  <Row className="mt-5 d-flex justify-content-center no-wrap gap-3 row-cols-1 ">
                    <Col
                      className="d-flex justify-content-center"
                      style={{ height: "60vh" }}>
                      <Card>
                        <Card.Header>Le prenotazioni attive dei van travelers</Card.Header>
                        <Row className="d-flex flex-grow-1">
                          <Col
                            sm={4}
                            className="d-flex">
                            <CardPrenotazioni></CardPrenotazioni>
                          </Col>
                        </Row>
                        <Card.Footer className="text-muted"></Card.Footer>
                      </Card>
                    </Col>
                    <Col
                      className="d-flex justify-content-center"
                      style={{ height: "60vh" }}>
                      <Card>
                        <Card.Header>BLOG POOST</Card.Header>
                        <Row className="d-flex flex-grow-1">
                          <Col
                            sm={4}
                            className="d-flex">
                            <CardPrenotazioni></CardPrenotazioni>
                          </Col>
                        </Row>
                        <Card.Footer className="text-muted"></Card.Footer>
                      </Card>
                    </Col>
                  </Row>
                </Row>
              </Col>
              <Col sm={3}>
                <Row className="d-flex flex-column">
                  <Nav
                    variant="tabs"
                    defaultActiveKey="#first"
                    className="d-flex  border-0">
                    <Nav.Item className="navCalendar">
                      <Nav.Link
                        onClick={() => {
                          setCalendario(true);
                          setAltro(false);
                        }}>
                        Calendario
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="navCalendar">
                      <Nav.Link
                        onClick={() => {
                          setCalendario(false);
                          setAltro(true);
                        }}>
                        Notifiche
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Col>
                    {date
                      ? calendario && (
                          <>
                            <h2>Le disponibilita per gli utenti</h2>
                            <Calendario
                              array={date}
                              idDispo={idDispo}
                            />
                          </>
                        )
                      : calendario && (
                          <>
                            <h4>Registra un mezzo per utilizzare questa funzionalità </h4>
                          </>
                        )}
                    {altro ? (
                      <Card>
                        <CardHeader>
                          <CardTitle>Notifiche</CardTitle>
                        </CardHeader>
                        <Card.Body>
                          <Row
                            className="d-flex row-cols-1 oV overflow-y-scroll"
                            style={{ height: "30vh" }}>
                            {notifiche &&
                              notifiche.map((elem, i) => (
                                <Notifiche
                                  notifica={elem}
                                  key={i}
                                  i={i}
                                  setNotifiche={setNotifiche}
                                />
                              ))}
                          </Row>
                        </Card.Body>
                      </Card>
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        ) : (
          <></>
        )}
      </Container>
    </div>
  );
};
export default ProfileOwner;
