import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import { fetchAnnouncement } from "../../redux/actions/fetchActions";

import { Button, Card, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import CaruselVehicle from "./CaruselVehicle";
import CardInterni from "./CardInterni";
import Motorizzazione from "./Motorizzazione";
import NavCardVehicle from "./NavCardVehicle";

import { FaPenToSquare } from "react-icons/fa6";
import { FaFileUpload } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import cover from "../../assets/user_placeholder.png";
import RegisterVehicle from "./RegisterVehicle";

const ProfileVehicle = () => {
  const token = useSelector(state => state.login.token);
  const vehicle = useSelector(state => state.vehicles.vehicle);

  const [interni, setInterni] = useState(false);
  const [motorizzazione, setMotorizzazione] = useState(false);
  const [creaAnnuncio, setCreaAnnuncio] = useState(false);
  const [foto, setFoto] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerForm = async e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    dispatch(fetchAnnouncement(token, form.get("annuncio")));
  };

  return (
    <div className="ProfileVehicle">
      {vehicle ? (
        <Container>
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

          {vehicle && (
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
                    height={500}
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
                {creaAnnuncio &&
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
                          <Col className="text-center">
                            <Button
                              type="submit"
                              form="formModificaAnnuncio"
                              className="bg-transparent border-0">
                              <FaPenToSquare
                                style={{ color: "#144658" }}
                                fontSize={40}
                              />
                            </Button>
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
                        className="bg-white"
                        style={{ borderRadius: "10px" }}>
                        <Row>
                          <Col className="text-center">
                            <Form
                              id="formAnnuncio"
                              onSubmit={handlerForm}>
                              <FormGroup>
                                <Form.Control
                                  name="annuncio"
                                  as="textarea"
                                  style={{ backgroundColor: "#00000000" }}
                                  rows={6}
                                  placeholder="Scrivi l'annuncio che visualizzeranno i van travelers"
                                  required
                                />
                              </FormGroup>
                              <Button
                                type="submit"
                                form="formAnnuncio"
                                className="bg-transparent border-0">
                                <FaFileUpload
                                  className="mt-3"
                                  style={{ color: "#144658" }}
                                  fontSize={50}
                                />
                              </Button>
                            </Form>
                          </Col>
                        </Row>
                      </Container>
                    </Container>
                  ))}

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
          )}
        </Container>
      ) : (
        <RegisterVehicle></RegisterVehicle>
      )}
    </div>
  );
};
export default ProfileVehicle;
