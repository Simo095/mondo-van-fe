import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addResult } from "../../redux/actions";

const FiltriSideBar = ({ startProps, endProps, beds, prov }) => {
  const [startDate, setStartDate] = useState(new Date(startProps));
  const [endDate, setEndDate] = useState(new Date(endProps));
  const [provinces, setProvinces] = useState();
  const [province, setProvince] = useState(prov);
  const [prezzo, setPrezzo] = useState(0);
  const [newBeds, setNewBeds] = useState(beds);
  const [isValid, setIsValid] = useState(false);
  const [isValidBad, setIsValidBed] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = async dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleProvinceClick = async e => {
    setIsValid(true);
    const risposta = await fetch("http://localhost:8080/sign_in/prov", {
      method: "GET"
    });
    if (risposta.ok) {
      const data = await risposta.json();
      setProvinces(data.content);
    }
  };

  const handlerSubmit = async e => {
    e.preventDefault();
    const startForm = startDate.toLocaleDateString("fr-CA");
    const endForm = endDate.toLocaleDateString("fr-CA");
    if (isValid && isValidBad) {
      console.log("tutto");
      const pageble = await fetch(
        `http://localhost:8080/sign_in/date_prov_beds?start=${startForm}&end=${endDate}&beds=${newBeds}&province=${province}`,
        {
          method: "GET"
        }
      );
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page/${startForm}/${endDate}/${newBeds}/${province}`);
      } else {
        setError(true);
      }
    }
    if (!isValid && !isValidBad) {
      console.log("date");
      console.log(isValid);
      const pageble = await fetch(`http://localhost:8080/sign_in/date?start=${startForm}&end=${endForm}`, {
        method: "GET"
      });
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page/${startForm}/${endForm}`);
      } else {
        setError(true);
      }
    }
    if (!isValid && isValidBad) {
      console.log("bad");
      const pageble = await fetch(
        `http://localhost:8080/sign_in/date_beds?start=${startForm}&end=${endForm}&beds=${newBeds}`,
        {
          method: "GET"
        }
      );
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page/${startForm}/${endForm}/${newBeds}`);
      } else {
        setError(true);
      }
    }
    if (isValid && !isValidBad) {
      console.log(startForm);
      const pageble = await fetch(
        `http://localhost:8080/sign_in/date_province?start=${startForm}&end=${endForm}&province=${province}`,
        {
          method: "GET"
        }
      );
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page/${startForm}/${endForm}/${province}`);
      } else {
        setError(true);
      }
    }
  };
  const handlerBeds = e => {
    setNewBeds(e.target.value);
  };
  const handlerPrezzo = e => {
    setPrezzo(e.target.value);
  };
  const handleProvinceChange = event => {
    setProvince(event.target.value);
  };
  useEffect(() => {
    handleProvinceClick();
    setIsValid(province ? true : false);
    setIsValidBed(newBeds ? true : false);
    if (province === "Tutte le province") {
      setIsValid(false);
    }
    if (newBeds === "Qualsiasi posto letto") {
      setIsValidBed(false);
    }
  }, [province, newBeds]);
  return (
    <div className="FiltriSideBar">
      {error ? <Alert variant="danger">Non ci sono disponibilita</Alert> : <></>}
      <Container>
        <h3>Modifica risultati</h3>
        <Form onSubmit={handlerSubmit}>
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
                      onClick={() => setError(false)}
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
                    <FormSelect
                      value={newBeds}
                      onChange={handlerBeds}
                      onClick={() => setError(false)}>
                      <option>cambia i posti letto</option>
                      <option value={2}>2 letti</option>
                      <option value={3}>3 letti</option>
                      <option value={4}>4 letti</option>
                      <option value={5}>5 letti</option>
                      <option value={6}>6 letti</option>
                    </FormSelect>
                  </FormGroup>
                </Col>
                <Col>
                  <FormLabel>Cambia prezzo: {prezzo}€</FormLabel>
                  <FormGroup>
                    <Form.Range
                      value={prezzo}
                      max={500}
                      onChange={handlerPrezzo}
                    />
                  </FormGroup>
                  <div className="d-flex justify-content-between">
                    <p>0€</p>
                    <p>500€</p>
                  </div>
                </Col>
                <Col>
                  <Button type="submit">VAI</Button>
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
