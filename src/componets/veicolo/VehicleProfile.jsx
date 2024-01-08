import { Button, Card, Col, Container, Row } from "react-bootstrap";
import NavCardVehicle from "./NavCardVehicle";
import { useState } from "react";
import CaruselVehicle from "./CaruselVehicle";
import cover from "../../assets/img/user_placeholder.png";
import CardInterni from "./CardInterni";
import { useNavigate } from "react-router";
import { IoAddCircle } from "react-icons/io5";
import Motorizzazione from "./Motorizzazione";

const VehicleProfile = ({ vehicle, token }) => {
  const navigate = useNavigate();
  const [interni, setInterni] = useState(false);
  const [motorizzazione, setMotorizzazione] = useState(false);
  const [creaAnnuncio, setCreaAnnuncio] = useState(false);
  const [foto, setFoto] = useState(true);
  return (
    <Container>
      <NavCardVehicle
        setMotorizzazione={setMotorizzazione}
        setInterni={setInterni}
        setCreaAnnuncio={setCreaAnnuncio}
        setFoto={setFoto}
      />
      <Card>
        {foto && (
          <CaruselVehicle
            vehicle={vehicle}
            cover={cover}
            token={token}
            height={600}
          />
        )}
        {interni &&
          (vehicle.vehiclesArrangement ? (
            <Container
              fluid
              style={{ backgroundColor: "#144658" }}
              className="py-3">
              <CardInterni vehicle={vehicle}></CardInterni>
            </Container>
          ) : (
            <Container
              fluid
              style={{ backgroundColor: "#144658" }}
              className="p-3">
              <Row
                className="bg-white"
                style={{ borderRadius: "10px" }}>
                <h5>Interni</h5>
                <p>Inserisci qualche dato in piu sul tuo Van per metterlo in noleggio</p>
                <Button
                  className="bg-transparent border-0"
                  onClick={() => {
                    navigate("/vehicle_arrangement");
                  }}>
                  <IoAddCircle
                    className="mt-3"
                    style={{ color: "#144658" }}
                    fontSize={50}
                  />
                </Button>
              </Row>
            </Container>
          ))}
        {creaAnnuncio && vehicle.announcement ? (
          <Container
            fluid
            style={{ backgroundColor: "#144658" }}
            className="py-3">
            <Container
              className="bg-white"
              style={{ borderRadius: "10px" }}>
              <Row xs={1}>
                <Col className="my-3">
                  <p>{vehicle.announcement}</p>
                </Col>
              </Row>
            </Container>
          </Container>
        ) : (
          creaAnnuncio && (
            <Container
              fluid
              style={{ backgroundColor: "#144658" }}
              className="py-3">
              <Container
                className="bg-white"
                style={{ borderRadius: "10px" }}>
                <Row xs={1}>
                  <Col className="my-3">
                    <p className="text-center">Ops, l'utente non ha creato ancora nessun annuncio...</p>
                  </Col>
                </Row>
              </Container>
            </Container>
          )
        )}
        {motorizzazione && (
          <Container
            fluid
            style={{ backgroundColor: "#144658" }}
            className="py-3">
            <Motorizzazione vehicle={vehicle} />
          </Container>
        )}
      </Card>
    </Container>
  );
};
export default VehicleProfile;
