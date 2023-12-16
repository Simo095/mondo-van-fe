import { Col, Container, Image, Row } from "react-bootstrap";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import { MdHeight } from "react-icons/md";
import { PiEngineBold } from "react-icons/pi";
import { RxWidth } from "react-icons/rx";
import { SlSpeedometer } from "react-icons/sl";
import cambio from "../../assets/icone/Cambio.png";
import patente from "../../assets/icone/Patente.png";
import cintura from "../../assets/icone/cinturaSicurezza.png";
const Motorizzazione = ({ vehicle }) => {
  return (
    <Container
      className="bg-white"
      style={{ maxWidth: "500px", borderRadius: "10px" }}>
      <Row sm={1}>
        <h5>
          {vehicle.brand} - {vehicle.model} - Username: {vehicle.name}
        </h5>

        <Col className="text-start">
          <Row>
            <Col>
              <Row
                xs={4}
                className="mb-3">
                <Col
                  sm={3}
                  className="d-flex flex-column gap-1 align-items-center justify-content-centet">
                  <SlSpeedometer fontSize={30} />
                  <p>{vehicle.kilometers} KM</p>
                </Col>
                <Col
                  sm={3}
                  className="d-flex flex-column gap-1 align-items-center justify-content-centet">
                  <CiCalendar fontSize={30} />
                  <p>{vehicle.firstEnrollment.substring(0, 4)}</p>
                </Col>
                <Col
                  sm={3}
                  className="d-flex pt-1 flex-column gap-2 align-items-center justify-content-centet">
                  <Image
                    style={{ width: "35px" }}
                    src={patente}
                  />
                  <p>{vehicle.license}</p>
                </Col>
                <Col
                  sm={3}
                  className="d-flex flex-column gap-1 align-items-center justify-content-centet">
                  <Image
                    style={{ width: "35px" }}
                    src={cintura}
                  />
                  <p>{vehicle.sits}</p>
                </Col>
              </Row>
              <Row xs={3}>
                <Col
                  sm={3}
                  className="d-flex flex-column gap-1 align-items-center justify-content-centet">
                  <PiEngineBold fontSize={30} />
                  <p>
                    {vehicle.displacement} cm<sup>3</sup>
                  </p>
                </Col>
                <Col
                  sm={3}
                  className="d-flex flex-column gap-2 align-items-center justify-content-centet">
                  <BsFillFuelPumpFill fontSize={30} />
                  <p>{vehicle.supply}</p>
                </Col>
                <Col
                  sm={3}
                  className="d-flex flex-column gap-1 align-items-center justify-content-centet">
                  <Image
                    style={{ width: "35px" }}
                    src={cambio}
                  />
                  <p>
                    {vehicle.transmission === "MANUAL"
                      ? "MANUALE"
                      : vehicle.transmission === "AUTO"
                      ? "AUTOMATICO"
                      : vehicle.transmission === "SEMI_AUTO"
                      ? "SEMI AUTOMATICO"
                      : ""}
                  </p>
                </Col>
              </Row>
              <h5>Sagoma veicolo</h5>
              <Row xs={3}>
                <Col
                  sm={3}
                  className="d-flex flex-column gap-1 align-items-center justify-content-centet">
                  <MdHeight fontSize={30} />
                  <p>{vehicle.height}m</p>
                </Col>

                <Col
                  sm={3}
                  className="d-flex flex-column gap-1 align-items-center justify-content-centet">
                  <RxWidth fontSize={30} />
                  <p>{vehicle.length}m</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default Motorizzazione;
