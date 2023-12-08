import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, CardImg, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const ResultPage = () => {
  const user = useSelector(state => state.login.user);
  const token = useSelector(state => state.login.token);
  const results = useSelector(state => state.result.vehicles);

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
            <h1>titolo</h1>
            <Row>
              <Col sm={2}>Filtri</Col>
              <Col sm={7}>
                <Row className="row-cols-3">
                  {results &&
                    results.map((elem, i) => {
                      return (
                        <Col
                          sm={4}
                          key={i}>
                          <Card>
                            <CardHeader>{elem.name + " " + elem.desc}</CardHeader>
                            <CardImg src={elem.avatar[0]}></CardImg>
                            <CardFooter>
                              <Button
                                onClick={() => {
                                  let id = elem.id;
                                }}>
                                Vai a
                              </Button>
                            </CardFooter>
                          </Card>
                        </Col>
                      );
                    })}
                </Row>
              </Col>
              <Col sm={3}>SideBar</Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default ResultPage;
