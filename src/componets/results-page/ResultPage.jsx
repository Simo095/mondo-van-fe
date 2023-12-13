import { useEffect } from "react";
import { Button, Card, CardBody, CardFooter, CardTitle, Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import FiltriSideBar from "../FiltriSideBar";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/style/card-vehicle.css";
import "../../assets/style/button.css";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaArrowRight, FaEuroSign } from "react-icons/fa";
import cintura from "../../assets/cinturaSicurezza.png";

import cover from "../../assets/user_placeholder.png";
import CaruselVehicle from "../veicolo/CaruselVehicle";
import { endDate, startDate } from "../../redux/actions";

const ResultPage = () => {
  const user = useSelector(state => state.login.user);
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
              <Col sm={2}>
                <FiltriSideBar
                  start={params.start_date}
                  end={params.end_date}
                  beds={params.beds}
                  prov={params.province}
                />
              </Col>
              <Col sm={8}>
                <Row
                  className="row-cols-3 overflow-y-scroll oV"
                  style={{
                    height: "100vh"
                  }}>
                  {results &&
                    results.map((elem, i) => {
                      return (
                        <Col
                          sm={3}
                          className="d-flex my-3"
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
                              <span className="text">Vai alla scheda</span>
                              <span className="circle"></span>
                              <FaArrowRight className="arr-1" />
                            </Button>

                            <CardBody>
                              <CardTitle className="titlo mt-3 mb-0 mx-2">{elem.name + " - " + elem.desc}</CardTitle>
                            </CardBody>
                            <CardFooter className="bottom-section">
                              <Row className="row row1">
                                <Col className="item d-flex flex-column align-items-center gap-2">
                                  <Image
                                    src={cintura}
                                    style={{ width: "20px" }}
                                  />
                                  <span className="regular-text">{elem.sits}</span>
                                </Col>
                                <Col className="item d-flex flex-column align-items-center gap-2">
                                  <FaEuroSign className="mb-1 big-text" />
                                  <span className="regular-text">{elem.pricePerDay} €/giorno</span>
                                </Col>
                                <Col className="item d-flex flex-column align-items-center pe-3 gap-2">
                                  <span className="big-text mb-1">{elem.brand}</span>
                                  <span className="regular-text">{elem.model}</span>
                                </Col>
                              </Row>
                            </CardFooter>
                          </Card>
                        </Col>
                      );
                    })}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default ResultPage;
