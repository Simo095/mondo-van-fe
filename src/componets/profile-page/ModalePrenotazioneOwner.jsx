import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteReservation } from "../../redux/actions/fetchActions";

const ModalePrenotazioneOwner = ({ show, handleClose, pre, setPrenotazioni, setLoadingPre }) => {
  const token = useSelector(state => state.login.token);
  const dispatch = useDispatch();
  return (
    <>
      {pre.state === "TAKING_CHARGE" ? (
        <Modal
          show={show}
          onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Conferma?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Conferma la prenotazione per poter ricevere il pagamento, Se premi su annulla cancelli la prenotazione anche
            dalle tue disponibilita
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => dispatch(fetchDeleteReservation(token, pre.id, setPrenotazioni, setLoadingPre))}>
              Annulla
            </Button>
            <Button
              variant="primary"
              onClick={handleClose}>
              Conferma
            </Button>
          </Modal.Footer>
        </Modal>
      ) : pre.state === "PENDING_PAYMENT" ? (
        "IN ATTESA DEL PAGAMENTO"
      ) : pre.state === "CONFIRMED" ? (
        "CONFERMATA"
      ) : pre.state === "NOT_CONFIRMED" ? (
        <Modal
          show={show}
          onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Non confermata</Modal.Title>
          </Modal.Header>
          <Modal.Body>La prenotazione è stata annullata</Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};
export default ModalePrenotazioneOwner;
