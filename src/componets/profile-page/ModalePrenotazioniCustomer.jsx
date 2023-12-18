import { Modal } from "react-bootstrap";

const ModalePrenotazioniCustomer = ({ showAttesaConferma, handleCloseAttesaConferma, pre }) => {
  return (
    <>
      {pre.state === "TAKING_CHARGE" ? (
        <Modal
          show={showAttesaConferma}
          onHide={handleCloseAttesaConferma}>
          <Modal.Header closeButton>
            <Modal.Title>Attesa conferma</Modal.Title>
          </Modal.Header>
          <Modal.Body>Sei in attesa della conferma del proprietario...</Modal.Body>
        </Modal>
      ) : pre.state === "PENDING_PAYMENT" ? (
        "Paga"
      ) : pre.state === "CONFIRMED" ? (
        "CONFERMATA"
      ) : pre.state === "NOT_CONFIRMED" ? (
        <Modal
          show={showAttesaConferma}
          onHide={handleCloseAttesaConferma}>
          <Modal.Header closeButton>
            <Modal.Title>Prenotazione rifiutata</Modal.Title>
          </Modal.Header>
          <Modal.Body>Il proprietario ha rifiutato la tua prenotazione</Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};
export default ModalePrenotazioniCustomer;
