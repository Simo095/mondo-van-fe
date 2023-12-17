import { Button, Modal } from "react-bootstrap";

const ModalePrenotazione = ({ show, handleClose, pre }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {pre.state === "TAKING_CHARGE"
          ? "Conferma la prenotazione per poter ricevere il pagamento"
          : pre.state === "PENDING_PAYMENT"
          ? "IN ATTESA DEL PAGAMENTO"
          : pre.state === "CONFIRMED"
          ? "CONFERMATA"
          : pre.state === "NOT_CONFIRMED"
          ? "NON CONFERMATA"
          : ""}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalePrenotazione;
