import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
const SideBar = () => {
  const hadlerSubmit = e => {
    e.preventDefault();
  };
  return (
    <>
      <div className="SideBar">
        <Container>
          <Row
            className="d-flex flex-row"
            style={{
              height: "100vh"
            }}>
            <Col className="border">
              <Row className="mt-3 d-flex flex-column g-4">
                <Col>
                  <Link to="/register_vehicle">Iscrivi il tuo veicolo</Link>
                </Col>
                <Col>
                  <Link to="/profile_vehicle">il tuo veicolo</Link>
                </Col>
                <Col>
                  <Link to="/profile_owner">Profile</Link>
                </Col>
                <Col>
                  <Link to="/log_out">Logout</Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default SideBar;
