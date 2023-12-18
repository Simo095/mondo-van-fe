import { useEffect } from "react";
import { Button, Card, CardBody, CardFooter, CardTitle, Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
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
import { endDate, startDate } from "../../redux/actions";

const ResultPage = () => {
  const token = useSelector(state => state.login.token);
  const results = useSelector(state => state.result.vehicles);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerResults = () => {
    console.log(results);
  };

  useEffect(() => {
    handlerResults();
  }, []);

  return (
    <div className="ResultPage">
      <div className="d-flex justify-content-between">
        <h1>Risultati</h1>
        <div className="d-flex align-items-center">
          <IoArrowBackCircleOutline
            onClick={() => {
              navigate("/");
            }}
            className="fs-1"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <Container fluid>
        <Row>
          <Col>
            <Row>
              <Col
                sm={3}
                className="ColSidebarFiltri"
                style={{ maxWidth: "300px" }}>
                <FiltriSideBar
                  startProps={params.start_date}
                  endProps={params.end_date}
                  beds={params.beds}
                  prov={params.province}
                />
              </Col>
              <Col
                className="flex-grow-1"
                sm={8}>
                <Container
                  fluid
                  className="d-flex flex-wrap overflow-y-scroll oV"
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
                              height={230}
                            />
                            <Button
                              onClick={() => {
                                dispatch(startDate(params.start_date));
                                dispatch(endDate(params.end_date));
                                navigate(`/result/${elem.id}`);
                              }}
                              className="animated-button">
                              <FaArrowRight className="arr-2" />
                              <span className="text mb-2">Vai alla scheda</span>
                              <span className="circle"></span>
                              <FaArrowRight className="arr-1" />
                            </Button>

                            <CardBody>
                              <CardTitle className="titlo mt-3 mb-0 mx-2">{elem.name + " - " + elem.desc}</CardTitle>
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
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default ResultPage;
