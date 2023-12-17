import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import CardInterni from "../veicolo/CardInterni";
import CaruselVehicle from "../veicolo/CaruselVehicle";
import cover from "../../assets/user_placeholder.png";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import NavResultVehicle from "./NavResultVehicle";
import Motorizzazione from "../veicolo/Motorizzazione";
import PrenotazioneSideBar from "../stucture/PrenotazioneSideBar";

const Result = () => {
  const token = useSelector(state => state.login.token);
  const logged = useSelector(state => state.result.logged);
  const startDate = useSelector(state => state.result.startDate);
  const endDate = useSelector(state => state.result.endDate);
  const r = useSelector(state => state.result.vehicles);
  const params = useParams();

  const [interni, setInterni] = useState(true);
  const [motorizzazione, setMotorizzazione] = useState(false);
  const [annuncio, setAnnuncio] = useState(false);
  const [vehicle, setVehicle] = useState();
  const [diff, setDiff] = useState();

  const navigate = useNavigate();

  const vehicleFetchDetail = async () => {
    if (logged) {
      const vehicle = await fetch(`http://localhost:8080/vehicles/result/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (vehicle.ok) {
        const vehicleData = await vehicle.json();
        setVehicle(vehicleData);
      }
    } else {
      navigate("/register");
    }
  };

  const calcolaGiorni = () => {
    if (startDate && endDate) {
      const d1 = new Date(startDate);
      const d2 = new Date(endDate);
      const diff = Math.abs(d2.getTime() - d1.getTime()) / (1000 * 3600 * 24) + 1;
      setDiff(diff);
    }
  };

  useEffect(() => {
    vehicleFetchDetail();
    if (startDate && endDate) {
      calcolaGiorni();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {r.length !== 0 && vehicle ? (
        <Container
          fluid
          className="Result">
          <div className="d-flex justify-content-between my-4 position-relative">
            <h4>
              {vehicle.name}
              {" - "}
              {vehicle.type === "CAMPERIZED_JEEP"
                ? "JEEP ATTREZZATA"
                : vehicle.type === "ROOFTOOP_CAR"
                ? "MACCHINA ATTREZZATA"
                : vehicle.type === "VAN"
                ? "VAN"
                : vehicle.type === "CAMPER"
                ? "CAMPER"
                : vehicle.type === "OTHER"
                ? "ALTRO"
                : ""}
              {" - "}
              {vehicle.shortDescriptions ? vehicle.shortDescriptions : ""}
            </h4>

            <div className="d-flex align-items-center">
              <IoArrowBackCircleOutline
                onClick={() => {
                  console.log(params);
                  navigate(-1);
                }}
                className="fs-1"
                style={{ cursor: "pointer", zIndex: "1" }}
              />
            </div>
          </div>
          <Row
            md={1}
            lg={2}>
            <Col lg={8}>
              <CaruselVehicle
                vehicle={vehicle}
                cover={cover}
                token={token}
                height={600}
              />
              {vehicle && (
                <>
                  <NavResultVehicle
                    setAnnuncio={setAnnuncio}
                    setMotorizzazione={setMotorizzazione}
                    setInterni={setInterni}
                  />

                  {interni && vehicle && (
                    <Container
                      fluid
                      style={{ backgroundColor: "#144658" }}
                      className="py-3">
                      <CardInterni vehicle={vehicle}></CardInterni>
                    </Container>
                  )}
                  {annuncio &&
                    (vehicle.announcement ? (
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
                      <Container
                        fluid
                        style={{ backgroundColor: "#144658" }}
                        className="py-3">
                        <Container
                          className="bg-white d-flex justify-content-center"
                          style={{ borderRadius: "10px" }}>
                          <Row xs={1}>
                            <Col className="my-3">
                              <p>Nessun annuncio...</p>
                            </Col>
                          </Row>
                        </Container>
                      </Container>
                    ))}
                </>
              )}
              {motorizzazione && vehicle && (
                <Container
                  fluid
                  style={{ backgroundColor: "#144658" }}
                  className="py-3">
                  <Motorizzazione vehicle={vehicle} />
                </Container>
              )}
            </Col>
            <Col lg={4}>
              <PrenotazioneSideBar
                vehicleProp={vehicle}
                result={r}
                startDateProps={startDate}
                endDateProps={endDate}
                diffProps={diff}
              />
            </Col>
          </Row>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};
export default Result;
