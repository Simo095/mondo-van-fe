import { useState } from "react";
import { Button, Col, Container, Form, Image, Modal, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { MdOutlineMarkChatRead } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchReadNotifica } from "../../redux/actions/fetchActions";

const Notifica = ({ elem, setNotifiche }) => {
  const token = useSelector(state => state.login.token);

  const [show, setShow] = useState(false);
  const [showDue, setShowDue] = useState(false);
  const dispatch = useDispatch();

  const handleShowNotifica = () => {
    setShow(true);
  };
  const handleClose = () => setShow(false);
  const handleCloseDue = () => setShowDue(false);
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
        receiver: elem.sender.email
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
    <>
      <Modal
        show={showDue}
        onHide={handleCloseDue}>
        <Modal.Header closeButton>
          <Modal.Title>Risposta a {elem.sender.name}</Modal.Title>
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
            form="form"
            type="submit"
            variant="primary">
            Invia
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={show}
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Messaggio da {elem.sender.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="overflow-y-scroll d-flex flex-column align-items-center">{elem.text}</Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <OverlayTrigger
            placement="right"
            delay={{ show: 150, hide: 100 }}
            overlay={<Tooltip id="button-tooltip">Letta</Tooltip>}>
            <Button
              className="bg-light border-0"
              onClick={() => dispatch(fetchReadNotifica(token, elem.id, handleClose, setNotifiche))}>
              <MdOutlineMarkChatRead
                color="#144658"
                fontSize={40}
              />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="right"
            delay={{ show: 150, hide: 100 }}
            overlay={<Tooltip id="button-tooltip">Rispondi</Tooltip>}>
            <Button
              className="bg-light border-0"
              onClick={() => {
                handleShowDue();
              }}>
              <RiQuestionAnswerFill
                color="#144658"
                fontSize={40}
              />
            </Button>
          </OverlayTrigger>
        </Modal.Footer>
      </Modal>
      {elem.state === "READ" ? (
        <Container
          fluid
          onClick={handleShowNotifica}
          key={elem.id}
          className="cardNotifica p-0  my-2 relative">
          <Image
            src={elem.sender.avatar}
            className="imgNotifica"
          />
          <Row className="textBoxNotifica">
            <Col className="textContentNotifica">
              <p className="h1Notifica m-0">{elem.sender.name}</p>
              {/* <span className="spanNotifica">{elem.createAt.toLocaleString("it,IT")}</span> */}
            </Col>
            <p className="pNotifica">{elem.state === "NOT_READ" ? "Questa è nuova!" : "Questa è letta..."}</p>
          </Row>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#cad9ba",
              position: "relative"
            }}></div>
        </Container>
      ) : (
        <Container
          fluid
          onClick={handleShowNotifica}
          key={elem.id}
          className="cardNotifica p-0  my-2">
          <Image
            src={elem.sender.avatar}
            className="imgNotifica"
          />
          <Row className="textBoxNotifica">
            <Col className="textContentNotifica">
              <p className="h1Notifica m-0">{elem.sender.name}</p>
              {/* <span className="spanNotifica">{elem.createAt.toLocaleString("it,IT")}</span> */}
            </Col>
            <p className="pNotifica">{elem.state === "NOT_READ" ? "Questa è nuova!" : "Questa è letta..."}</p>
          </Row>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: " #be311a",
              position: "relative"
            }}></div>
        </Container>
      )}
    </>
  );
};
export default Notifica;
