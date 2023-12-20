import { Card } from "react-bootstrap";

import { useState } from "react";

import { useSelector } from "react-redux";
import ModalePrenotazioniCustomer from "./ModalePrenotazioniCustomer";
import ModalePrenotazioneOwner from "./ModalePrenotazioneOwner";

const Prenotazione = ({ pre, setPrenotazioni, setLoadingPre }) => {
  const user = useSelector(state => state.login.user);
  const [show, setShow] = useState(false);
  const [showAttesaConferma, setShowshowAttesaConferma] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseAttesaConferma = () => setShowshowAttesaConferma(false);
  const handleShow = () => setShow(true);
  const handleshowAttesaConferma = () => setShowshowAttesaConferma(true);

  return (
    <>
      <ModalePrenotazioniCustomer
        showAttesaConferma={showAttesaConferma}
        handleCloseAttesaConferma={handleCloseAttesaConferma}
        pre={pre}
      />
      <ModalePrenotazioneOwner
        show={show}
        handleClose={handleClose}
        pre={pre}
        setPrenotazioni={setPrenotazioni}
        setLoadingPre={setLoadingPre}
      />
      <Card.Body className="d-flex ">
        {user.role === "CUSTOMER" ? (
          <Card
            className="cardSpecialPrenotazioni"
            onClick={handleshowAttesaConferma}>
            <Card.Img
              variant="top"
              height={150}
              style={{ objectFit: "cover" }}
              src={pre.vehicle.avatar[0]}
            />
            <Card.Body className="d-flex flex-column justify-content-center">
              <Card.Title>
                Dal {pre.startDate.substring(5, 11).split("-").reverse().join("-")} al{" "}
                {pre.endDate.substring(5, 11).split("-").reverse().join("-")}
              </Card.Title>
              <Card.Text>Van: {pre.vehicle.name}</Card.Text>
              <Card.Text style={{ cursor: "pointer" }}>
                Stato:{" "}
                {pre.state === "TAKING_CHARGE"
                  ? "In attesa di conferma da parte del proprietario"
                  : pre.state === "PENDING_PAYMENT"
                  ? "Paga"
                  : pre.state === "CONFIRMED"
                  ? "CONFERMATA"
                  : pre.state === "NOT_CONFIRMED"
                  ? "NON CONFERMATA"
                  : ""}
              </Card.Text>
            </Card.Body>
          </Card>
        ) : (
          <Card
            className="cardSpecialPrenotazioni"
            onClick={handleShow}>
            <Card.Img
              variant="top"
              height={150}
              style={{ objectFit: "cover" }}
              src={pre.user.avatar}
            />
            <Card.Body className="d-flex flex-column justify-content-end">
              <Card.Title>
                Dal {pre.startDate.substring(5, 11).split("-").reverse().join("-")} al{" "}
                {pre.endDate.substring(5, 11).split("-").reverse().join("-")}
              </Card.Title>
              <Card.Text>Da: {pre.user.name}</Card.Text>
              <Card.Text style={{ cursor: "pointer" }}>
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
              {pre.state === "TAKING_CHARGE"
                ? "CONFERMA"
                : pre.state === "PENDING_PAYMENT"
                ? "IN ATTESA DEL PAGAMENTO"
                : pre.state === "CONFIRMED"
                ? "CONFERMATA"
                : pre.state === "NOT_CONFIRMED"
                ? "NON CONFERMATA"
                : ""}
            </Card.Body>
          </Card>
        )}
      </Card.Body>
    </>
  );
};
export default Prenotazione;
