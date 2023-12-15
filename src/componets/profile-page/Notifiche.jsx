import { useState } from "react";
import { Button, CardText, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { HiOutlineTrash } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { fetchCancellaNotifica, fetchReadNotifica } from "../../redux/actions/fetchActions.js";
const Notifiche = ({ notifica, i, setNotifiche }) => {
  const token = useSelector(state => state.login.token);

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [showDue, setShowDue] = useState(false);

  const handleClose = () => setShow(false);
  const handleCloseDue = () => setShowDue(false);
  const handleShow = () => setShow(true);
  const handleShowDue = () => setShowDue(true);

  const handlerRisposta = async e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const messaggio = form.get("messaggio");
    const risposta = await fetch(`http://localhost:8080/notifications/response`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        text: messaggio,
        object: "Risposta Prenotazione ",
        receiver: notifica.sender.email
      })
    });
    if (risposta.ok) {
      handleCloseDue();
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
    }
  };

  return (
    <Col>
      <Container className="d-flex justify-content-between">
        <div className="d-flex align-items-center justify-content-center gap-2">
          <div
            className="d-flex align-items-center justify-content-start"
            style={{ width: "50px" }}>
            {notifica.state === "READ" ? (
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ width: "20px", height: "20px", backgroundColor: "#28b00380", borderRadius: "50%" }}>
                {i + 1}
              </div>
            ) : notifica.state === "NOT_READ" ? (
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ width: "20px", height: "20px", backgroundColor: "#ff6060", borderRadius: "50%" }}>
                {i + 1}
              </div>
            ) : (
              <></>
            )}
            <p className="m-0"> </p>
          </div>
          <CardText
            style={{ cursor: "pointer" }}
            onClick={handleShow}>
            {notifica.sender.name}
          </CardText>
        </div>
        <HiOutlineTrash
          className="mt-2"
          onClick={() => {
            dispatch(fetchCancellaNotifica(token, setNotifiche, notifica.id));
          }}
          style={{
            cursor: "pointer",
            opacity: "0.5",
            fontSize: "1.3em",
            color: "red"
          }}
        />
      </Container>
      <Modal
        show={show}
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{notifica.object}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="d-flex flex-column">
            <Col className="mb-3">da: {notifica.sender.email}</Col>
            <Col>{notifica.text}</Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => dispatch(fetchReadNotifica(token, notifica.id, handleClose, setNotifiche))}>
            Letto
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              handleShowDue();
            }}>
            Rispondi
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showDue}
        onHide={handleCloseDue}>
        <Modal.Header closeButton>
          <Modal.Title>Risposta a {notifica.sender.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="d-flex flex-column">
            <Form
              id="form"
              onSubmit={handlerRisposta}>
              <Col className="d-flex justify-content-center gap-5">
                <Form.Group className="mb-3">
                  <Form.Control
                    name="messaggio"
                    id="messaggio"
                    as="textarea"
                    style={{ backgroundColor: "#00000000" }}
                    rows={6}
                    placeholder="Scrivi qui..."
                    required
                  />
                </Form.Group>
              </Col>
              <Col className="d-flex justify-content-center gap-5"></Col>
            </Form>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleCloseDue();
              handleShow();
            }}>
            Annulla
          </Button>
          <Button
            form="form"
            type="submit"
            variant="primary">
            Invia
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};
export default Notifiche;
