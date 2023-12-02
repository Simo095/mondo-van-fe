import { Col, Container, Row } from "react-bootstrap";
import NavBar from "../NavBar";
import SideBar from "../SideBar";

const ProfileVehicle = () => {
  return (
    <div className="ProfileVehicle">
      <NavBar />
      <Container>
        <Row>
          <Col sm={3}>
            <SideBar />
          </Col>
          <Col>
            Qualcosa
            <Row>
              <Col>
                <Row className="d-flex flex-column">
                  <Col>Altro</Col>
                  <Col>Altro</Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default ProfileVehicle;
