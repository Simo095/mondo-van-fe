import { Link } from "react-router-dom";
import { Button, Col, Container, Form, FormLabel, FormSelect, Row } from "react-bootstrap";
import sfondoHome from "../assets/VW-Giallo.jpg";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  const [provinces, setProvinces] = useState();
  const [province, setProvince] = useState("");

  //FORM
  const handlerSubmit = e => {
    e.preventDefault();
  };
  //CLICK PROVINCE
  const handleProvinceClick = async e => {
    //e.preventDefault();
    const risposta = await fetch("http://localhost:8080/auth/prov", {
      method: "GET"
    });
    if (risposta.ok) {
      const data = await risposta.json();
      console.log(data.content);
      setProvinces(data.content);
    }
  };
  //CHANGE PROV
  const handleProvinceChange = async event => {
    event.preventDefault();
    setProvince(event.target.value);
  };
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    //handleProvinceClick();
  }, []);
  return (
    <div className="Home">
      <NavBar />
      <Row
        className="d-flex flex-row"
        style={{
          height: "100vh"
        }}>
        {/* <Col sm={3}>
          <SideBar />
        </Col> */}
        <Col>
          <Row>
            <Col
              className="d-flex flex-column justify-content-center align-items-center"
              style={{
                backgroundImage: `url(${sfondoHome})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "bottom",
                height: "100vh"
              }}>
              <p>NOLEGGIA UN VAN PER LA TUA PROSSIMA VACANZA, E VIVI UN AVVENTUA INDIMENTICABILE</p>
              <p>COMPLETA LE TRE Q SOTTO PER PRENOTARE IL VAN PERFETTO</p>
              <Form
                onSubmit={handlerSubmit}
                className="d-flex gap-1"
                style={{ marginBottom: "30rem" }}>
                <Form.Group>
                  <FormSelect
                    className="btn-radius-end-0"
                    name="province"
                    value={province}
                    onChange={handleProvinceChange}>
                    <option>Quale citta scegli?</option>
                    {provinces ? (
                      provinces.map((province, index) => (
                        <option
                          key={index}
                          value={province.abbreviation}>
                          {province.province}
                        </option>
                      ))
                    ) : (
                      <></>
                    )}
                  </FormSelect>
                </Form.Group>
                <Form.Group>
                  {/* <Form.Control
                    type="date"
                    name="andata"
                    placeholder=""></Form.Control> */}
                  <DatePicker
                    selected={startDate}
                    className="form-control btn-radius-start-0 btn-radius-end-0"
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat={"dd-MM-yyyy"}
                    //excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
                    selectsRange
                    selectsDisabledDaysInRange
                    placeholderText="Quando vuoi partire?"
                  />
                </Form.Group>
                <Form.Group>
                  <FormSelect
                    name="letto"
                    className="btn-radius-start-0 btn-radius-end-0">
                    <option defaultValue>Quanti posti letto?</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                  </FormSelect>
                </Form.Group>

                <Button variant="success btn-radius-start-0">Parti!</Button>
              </Form>
            </Col>
          </Row>
          <Container></Container>
        </Col>
      </Row>
      <Footer />
    </div>
  );
};
export default Home;
