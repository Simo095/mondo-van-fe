import { Button, Card, CardBody, CardFooter, CardTitle, Col, Container, Image, Row } from "react-bootstrap";
import CaruselVehicle from "../veicolo/CaruselVehicle";
import cover from "../../assets/img/user_placeholder.png";
import cintura from "../../assets/icone/cinturaSicurezza.png";
import { useSelector } from "react-redux";
import { FaArrowRight, FaEuroSign } from "react-icons/fa";
import { GiPositionMarker } from "react-icons/gi";
const VanCustomerPagePlaceholder = ({ elem }) => {
  const token = useSelector(state => state.login.token);
  return (
    <Container>
      {console.log(elem)}
      <Card className="cardSpecial">
        <CaruselVehicle
          vehicle={elem}
          cover={cover}
          token={token}
          height={230}
        />
        <Button
          onClick={() => {
            // dispatch(startDate(params.start_date));
            // dispatch(endDate(params.end_date));
            // navigate(`/result/${elem.id}`);
          }}
          className="animated-button">
          <FaArrowRight className="arr-2" />
          <span className="text mb-2">Vai alla scheda</span>
          <span className="circle"></span>
          <FaArrowRight className="arr-1" />
        </Button>

        <CardBody>
          <CardTitle className="titlo mt-3 mb-0 mx-2">{elem.name + " - " + elem.shortDescriptions}</CardTitle>
        </CardBody>
        <CardFooter className="bottom-section">
          <Row className="row row1">
            <Col className="item d-flex flex-column align-items-center">
              <Image
                src={cintura}
                style={{ width: "20px" }}
              />
              <span className="regular-text">{elem.sits}</span>
            </Col>
            <Col className="item d-flex flex-column align-items-center">
              <FaEuroSign
                fontSize={15}
                className="mb-1"
              />
              <span className="regular-text m-0">{elem.pricePerDay} €/giorno</span>
            </Col>
            <Col className="item d-flex flex-column align-items-center pe-3">
              <GiPositionMarker fontSize={18} />

              <span className="regular-text m-0">{elem.province}</span>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    </Container>
  );
};
export default VanCustomerPagePlaceholder;
