import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const SideBar = () => {
  const user = useSelector(state => state.login.user);
  const vehicle = useSelector(state => state.vehicles.vehicle);
  const hadlerSubmit = e => {
    e.preventDefault();
  };
  return (
    <>
      <div className="SideBar">
        {user.role === "CUSTOMER" ? (
          <Container>
            <Row
              className="d-flex flex-row"
              style={{
                height: "100vh"
              }}>
              <Col className="border">
                <Row className="mt-3 d-flex flex-column g-4">
                  <Col>
                    <Link to="/register_vehicle">Prenota un van</Link>
                  </Col>
                  <Col>
                    <Link to="/profile_vehicle">Le tue prenotazioni</Link>
                  </Col>
                  <Col>
                    <Link to="/profile_customer">Profile</Link>
                  </Col>
                  <Col>
                    <Link to="/log_out">Logout</Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        ) : user.role === "OWNER" ? (
          <Container>
            <Row
              className="d-flex flex-row"
              style={{
                height: "100vh"
              }}>
              <Col className="border">
                <Row className="mt-3 d-flex flex-column g-4">
                  {vehicle ? (
                    <Col>
                      <Link to="/profile_vehicle">il tuo veicolo</Link>
                    </Col>
                  ) : (
                    <Col>
                      <Link to="/register_vehicle">Iscrivi il tuo veicolo</Link>
                    </Col>
                  )}

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
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default SideBar;
