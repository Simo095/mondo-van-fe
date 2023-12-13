import { useEffect, useState } from "react";
import { Col, Container, Form, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FiltriSideBar = ({ start, end, beds, prov }) => {
  const [startDate, setStartDate] = useState(new Date(start));
  const [endDate, setEndDate] = useState(new Date(end));
  const [provinces, setProvinces] = useState();
  const [province, setProvince] = useState(prov);
  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const handleProvinceClick = async e => {
    //e.preventDefault();
    const risposta = await fetch("http://localhost:8080/sign_in/prov", {
      method: "GET"
    });
    if (risposta.ok) {
      const data = await risposta.json();
      setProvinces(data.content);
    }
  };
  //CHANGE PROV
  const handleProvinceChange = async event => {
    event.preventDefault();
    setProvince(event.target.value);
  };
  useEffect(() => {
    handleProvinceClick();
  }, [province]);
  return (
    <div className="FiltriSideBar">
      <Container>
        <h3>Filtri</h3>
        <Form>
          <Row
            className="d-flex flex-column"
            style={{
              height: "100vh"
            }}>
            <Col>
              <Row className="row-cols-1 d-flex gap-5">
                <Col className="d-flex flex-column">
                  <FormLabel>Cambia date</FormLabel>
                  <FormGroup>
                    <ReactDatePicker
                      selected={startDate}
                      id="giorni"
                      name="giorni"
                      autoComplete="off"
                      className="form-control btn-radius-start-0 btn-radius-end-0"
                      onChange={onChange}
                      startDate={startDate}
                      endDate={endDate}
                      dateFormat={"dd-MM-yyyy"}
                      selectsRange
                      selectsDisabledDaysInRange></ReactDatePicker>
                  </FormGroup>
                </Col>
                <Col>
                  <FormLabel>Cambia luogo</FormLabel>
                  <Form.Group>
                    <FormSelect
                      className="btn-radius-end-0"
                      name="province"
                      value={province}
                      required
                      onChange={handleProvinceChange}>
                      <option value={"Tutte le province"}>Tutte le province</option>
                      {provinces ? (
                        provinces.map((province, index) => (
                          <option
                            key={index}
                            value={province.abbreviation}>
                            {province.name}
                          </option>
                        ))
                      ) : (
                        <></>
                      )}
                    </FormSelect>
                  </Form.Group>
                </Col>
                <Col>
                  <FormLabel>Cambia posti letto</FormLabel>
                  <FormGroup>
                    <FormSelect value={beds}>
                      <option>cambia i posti letto</option>
                      <option value={2}>2 letti</option>
                      <option value={3}>3 letti</option>
                      <option value={4}>4 letti</option>
                      <option value={5}>5 letti</option>
                      <option value={6}>6 letti</option>
                    </FormSelect>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};
export default FiltriSideBar;
