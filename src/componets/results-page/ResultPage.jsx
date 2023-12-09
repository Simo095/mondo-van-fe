import { useEffect } from "react";
import { Card, CardImg, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import FiltriSideBar from "../FiltriSideBar";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/style/card-vehicle.css";

const ResultPage = () => {
  const user = useSelector(state => state.login.user);
  const token = useSelector(state => state.login.token);
  const results = useSelector(state => state.result.vehicles);
  const params = useParams();

  const handlerResults = () => {
    console.log(results);
  };

  useEffect(() => {
    handlerResults();
  }, []);

  return (
    <div className="ResultPage">
      <Container fluid>
        <Row>
          <Col>
            <h1>Risultati</h1>
            <Row>
              <Col sm={3}>
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
                          sm={4}
                          key={i}>
                          <Card
                            style={{ height: "500px" }}
                            className="cardSpecial">
                            <CardImg src={elem.avatar[0]} />
                            <div class="bottom-section">
                              <span class="title">{elem.name + " - " + elem.desc}</span>
                              <div class="row row1">
                                <div class="item">
                                  <span class="big-text">Sits</span>
                                  <span class="regular-text">{elem.sits}</span>
                                </div>
                                <div class="item">
                                  <span class="big-text">€/giorno</span>
                                  <span class="regular-text">{elem.pricePerDay} €</span>
                                </div>
                                <div class="item">
                                  <span class="big-text">{elem.brand}</span>
                                  <span class="regular-text">{elem.model}</span>
                                </div>
                              </div>
                            </div>
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
