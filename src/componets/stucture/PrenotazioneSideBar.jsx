import { useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const PrenotazioneSideBar = ({ vehicleProp, result, startDateProps, endDateProps, diffProps }) => {
  const token = useSelector(state => state.login.token);
  const user = useSelector(state => state.login.user);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () =>
    user.role === "CUSTOMER" ? navigate("/profile_customer") : user.role === "OWNER" ? navigate("/profile_owner") : "";
  const handleShow = () => setShow(true);

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
          startDateProps +
          " al " +
          endDateProps +
          " al prezzo di " +
          vehicleProp.pricePerDay * diffProps +
          "€",
        receiver: vehicleProp.id
      })
    });
    if (notifica.ok) {
      const reservation = await fetch(`http://localhost:8080/reservations/${vehicleProp.id}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "content-type": "application/json"
        },
        body: JSON.stringify({
          start: startDateProps,
          end: endDateProps
        })
      });
      if (reservation.ok) {
        console.log("Ok");
        handleShow();
      }
    }
  };
  return (
    <Container>
      <Modal
        show={show}
        onHide={handleClose}>
        <Modal.Header
          closeButton
          closeVariant="white"
          style={{ background: "#051C12", borderColor: "green", color: "white" }}>
          <Modal.Title>Prenotazione Effettuata con successo</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#051C12", color: "white" }}>Bene, il messaggio è arrivato!</Modal.Body>
      </Modal>
      <h4>
        Prenota {vehicleProp.name} in provincia di{" "}
        {result.map((elem, i) => {
          return elem.name === vehicleProp.name ? result[i].province : "";
        })}
      </h4>
      <h5>
        dal {startDateProps.substring(5, 11).split("-").reverse().join("-")} al{" "}
        {endDateProps.substring(5, 11).split("-").reverse().join("-")} al prezzo di{" "}
        {vehicleProp.pricePerDay * diffProps} €
      </h5>
      <p>
        Prima di effettuare la prenotazione, è importante concordare con il proprietario del van i dettagli del
        noleggio. Ecco alcuni suggerimenti:
      </p>
      <ul>
        <li>Chiedi al proprietario se il van è disponibile per le date che desideri.</li>
        <li> Verifica le condizioni del van e assicurati che sia in buono stato.</li>
        <li>Chiedi al proprietario se il van è dotato di tutte le attrezzature e le comodità che ti servono.</li>
      </ul>
      <p>Prenota il van in anticipo, soprattutto se viaggi durante l'alta stagione.</p>

      <Form
        className="d-flex flex-column"
        onSubmit={handlerSubmit}>
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
        <Button type="submit">Invia richiesta</Button>
      </Form>
    </Container>
  );
};
export default PrenotazioneSideBar;
