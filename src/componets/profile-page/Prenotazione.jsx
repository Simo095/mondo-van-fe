import { Button, Card } from "react-bootstrap";
import ModalePrenotazione from "./ModalePrenotazione";
import { useState } from "react";

const Prenotazione = ({ pre }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <ModalePrenotazione
        show={show}
        handleClose={handleClose}
        pre={pre}
      />
      <Card.Body
        onClick={handleShow}
        className="d-flex">
        <Card>
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
    </>
  );
};
export default Prenotazione;
