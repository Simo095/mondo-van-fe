import { Button, Card, CardBody, CardFooter, Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import FiltriSideBar from "../../componets/stucture/FiltriSideBar";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/style/card-vehicle.css";
import "../../assets/style/button.css";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaArrowRight, FaEuroSign } from "react-icons/fa";
import cintura from "../../assets/icone/cinturaSicurezza.png";
import { GiPositionMarker } from "react-icons/gi";
import cover from "../../assets/img/user_placeholder.png";
import CaruselVehicle from "../veicolo/CaruselVehicle";
import { addBeds, addEndDate, addProvince, addStartDate } from "../../redux/actions";
import NavFiltri from "../stucture/NavFiltri";

const ResultPage = () => {
  const token = useSelector(state => state.login.token);
  const results = useSelector(state => state.result.vehicles);
  const startDateState = useSelector(state => state.result.startDate);
  const endDateState = useSelector(state => state.result.endDate);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const convertType = elem => {
    return elem.type === "CAMPERIZED_JEEP"
      ? "Jeep attrezzata"
      : elem.type === "ROOFTOOP_CAR"
      ? "Macchina attrezzata"
      : elem.type === "VAN"
      ? "Van"
      : elem.type === "CAMPER"
      ? "Camper"
      : elem.type === "OTHER"
      ? "Altro"
      : "";
  };

  const convertSupply = elem => {
    return elem.supply === "GASOLINE"
      ? "Benzina"
      : elem.supply === "DIESEL"
      ? "Diesel"
      : elem.supply === "LPG_DIESEL"
      ? "Diesel e GPL"
      : elem.supply === "ELECTRIC"
      ? "Elettrico"
      : elem.supply === "HYBRID"
      ? "Ibrido"
      : "";
  };

  return (
    <div className="ResultPage">
      <Container fluid>
        <div className="d-flex justify-content-between">
          <h1 className="logo fs-2 m-3 ps-5">Ecco i van disponibili</h1>
          <div className="d-flex align-items-center">
            <IoArrowBackCircleOutline
              onClick={() => {
                navigate("/");
                dispatch(addEndDate(null));
                dispatch(addStartDate(null));
                dispatch(addBeds(""));
                dispatch(addProvince(""));
              }}
              color="white"
              className="fs-1"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <NavFiltri />
        <Row className="d-flex justify-content-center gap-4">
          <Col
            sm={3}
            className="FiltriSideBar"
            style={{ width: "300px" }}>
            <FiltriSideBar />
          </Col>
          <Col
            className="ContainerProfile d-flex "
            sm={8}>
            <Container
              fluid
              className="d-flex QueryCenterResult flex-wrap overflow-y-scroll oV"
              style={{
                height: "100vh",
                maxWidth: "1465px"
              }}>
              {results &&
                results.map((elem, i) => {
                  return (
                    <div
                      className="m-2"
                      key={i}>
                      <Card className="cardSpecial">
                        <CaruselVehicle
                          vehicle={elem}
                          cover={cover}
                          token={token}
                          height={200}
                        />
                        {console.log(elem)}
                        <Button
                          onClick={() => {
                            dispatch(addStartDate(startDateState));
                            dispatch(addEndDate(endDateState));
                            navigate(`/result/${elem.id}`);
                          }}
                          className="animated-button">
                          <FaArrowRight className="arr-2" />
                          <span className="text mb-2">Vai alla scheda</span>
                          <span className="circle"></span>
                          <FaArrowRight className="arr-1" />
                        </Button>

                        <CardBody>
                          <b>
                            <p className="m-0 p-0">{elem.name + " - " + elem.brand}</p>
                          </b>
                          <p className="text-end m-0 p-0 paragrafSpecial">
                            {convertType(elem) + " con " + elem.beds + " letti"}
                          </p>
                          <p className="mt-2 p-0 mb-0"> {elem.desc}</p>
                          <p className="text-end m-0 p-0 paragrafSpecial">{convertSupply(elem)}</p>
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
                    </div>
                  );
                })}
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default ResultPage;
