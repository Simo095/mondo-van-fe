import { Button, Card } from "react-bootstrap";

const CardPrenotazioni = () => {
  return (
    <>
      <Card.Body className="d-flex flex-grow-1">
        <Card>
          <Card.Img
            variant="top"
            src="holder.js/100px180"
          />
          <Card.Body className="d-flex flex-column justify-content-end">
            <Card.Title>Card Title</Card.Title>
            <Card.Text>Le date</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Card.Body>
      <Card.Body className="d-flex flex-grow-1">
        <Card>
          <Card.Img
            variant="top"
            src="holder.js/100px180"
          />
          <Card.Body className="d-flex flex-column justify-content-end">
            <Card.Title>Card Title</Card.Title>
            <Card.Text>Le date</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Card.Body>
      <Card.Body className="d-flex flex-grow-1">
        <Card>
          <Card.Img
            variant="top"
            src="holder.js/100px180"
          />
          <Card.Body className="d-flex flex-column justify-content-end">
            <Card.Title>Card Title</Card.Title>
            <Card.Text>Le date</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Card.Body>
    </>
  );
};
export default CardPrenotazioni;
