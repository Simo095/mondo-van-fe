import { Button, Card, CardHeader, CardTitle, Col, Container, Form, Modal, Nav, Row, Spinner } from "react-bootstrap";
import { FaRegPenToSquare } from "react-icons/fa6";

import cover from "../../assets/user_placeholder.png";
import SideBar from "../../componets/stucture/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Calendario from "../../componets/stucture/Calendario";
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
  const [loadingPre, setLoadingPre] = useState(false);
  const [calendario, setCalendario] = useState(true);
  const [altro, setAltro] = useState(false);
  const [notifiche, setNotifiche] = useState([]);
  const [prenotazioni, setPrenotazioni] = useState(null);

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

  const fetchPrenotazioni = async () => {
    setLoadingPre(true);
    const risp = await fetch("http://localhost:8080/reservations", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    });
    if (risp.ok) {
      const pre = await risp.json();
      setPrenotazioni(pre.content);
      if (pre) {
        setLoadingPre(false);
      }
    }
  };

  useEffect(() => {
    dispatch(fetchVehicle(token, navigate));
    fetchDisponibilita();
    fetchNotifiche();
    fetchPrenotazioni();
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
            <Row className="d-flex justify-content-center">
              <Col
                className="sidebarCircle"
                style={{ width: "338px" }}
                sm={3}>
                <SideBar />

                <Row className="d-flex flex-column mt-3">
                  <Nav
                    variant="tabs"
                    defaultActiveKey="#first"
                    className="d-flex ms-3  border-0">
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
                      <Card className="">
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
              <Col
                style={{ height: "100vh" }}
                className="d-flex oV overflow-y-scroll">
                <Row className="d-flex ms-2 mt-5 flex-grow-1">
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

                  <Row className="mt-5 d-flex flex-grow-1 justify-content-center no-wrap gap-3 row-cols-1 ">
                    <Col>
                      {date && calendario ? (
                        <div className="mediaQueryCalendario mx-5">
                          <h2>Le disponibilita per gli utenti</h2>
                          <Calendario
                            array={date}
                            idDispo={idDispo}
                          />
                        </div>
                      ) : (
                        <div className="mediaQueryCalendario">
                          <h4>Registra un mezzo per utilizzare questa funzionalità </h4>
                        </div>
                      )}
                    </Col>
                    <Col className="d-flex justify-content-center">
                      <Card className="d-flex flex-grow-1">
                        <Card.Header>Prenotazioni</Card.Header>
                        <Row className="d-flex flex-grow-1">
                          {loadingPre ? (
                            <Spinner variant="danger" />
                          ) : (
                            prenotazioni &&
                            prenotazioni.map(pre => {
                              console.log(pre);
                              return (
                                <Col
                                  key={pre.id}
                                  className="d-flex">
                                  <Card.Body className="d-flex flex-grow-1">
                                    <Card>
                                      <Card.Img
                                        variant="top"
                                        src={pre.user.avatar}
                                      />
                                      <Card.Body className="d-flex flex-column justify-content-end">
                                        <Card.Title>
                                          Dal {pre.startDate.substring(5, 11).split("-").reverse().join("-")} al{" "}
                                          {pre.endDate.substring(5, 11).split("-").reverse().join("-")}
                                        </Card.Title>
                                        <Card.Text>Da: {pre.user.name}</Card.Text>
                                        <Card.Text>
                                          Stato:{" "}
                                          {pre.state === "TAKING_CHARGE"
                                            ? "DA CONFERMARE"
                                            : pre.state === "PENDING_PAYMENT"
                                            ? "IN ATTESA DEL PAGAMENTO"
                                            : pre.state === "CONFIRMED"
                                            ? "CONFERMATA"
                                            : pre.state === "NOT_CONFIRMED"
                                            ? "NON CONFERMATA"
                                            : ""}
                                        </Card.Text>
                                        <Button variant="primary">
                                          {pre.state === "TAKING_CHARGE"
                                            ? "CONFERMA"
                                            : pre.state === "PENDING_PAYMENT"
                                            ? "IN ATTESA DEL PAGAMENTO"
                                            : pre.state === "CONFIRMED"
                                            ? "CONFERMATA"
                                            : pre.state === "NOT_CONFIRMED"
                                            ? "NON CONFERMATA"
                                            : ""}
                                        </Button>
                                      </Card.Body>
                                    </Card>
                                  </Card.Body>
                                </Col>
                              );
                            })
                          )}
                        </Row>
                      </Card>
                    </Col>

                    <Col
                      className="d-flex justify-content-center"
                      style={{ height: "60vh" }}>
                      <Card className="d-flex flex-grow-1">
                        <Card.Header>BLOG POOST</Card.Header>
                        <Row className="d-flex flex-grow-1">
                          <Col
                            sm={4}
                            className="d-flex"></Col>
                        </Row>
                        <Card.Footer className="text-muted"></Card.Footer>
                      </Card>
                    </Col>
                  </Row>
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
