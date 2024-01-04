import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, FormGroup, FormLabel, FormSelect, Nav, Row } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addBeds, addProvince, addResult } from "../../redux/actions";

const FiltriSideBar = () => {
  const startDateState = useSelector(state => state.result.startDate);
  const endDateState = useSelector(state => state.result.endDate);
  const provinceState = useSelector(state => state.result.province);
  const bedsState = useSelector(state => state.result.beds);

  const [startDate, setStartDate] = useState(new Date(startDateState));
  const [endDate, setEndDate] = useState(new Date(endDateState));
  const [provinces, setProvinces] = useState();
  const [province, setProvince] = useState(provinceState);
  const [prezzo, setPrezzo] = useState(0);
  const [newBeds, setNewBeds] = useState(bedsState);
  const [isValid, setIsValid] = useState(false);
  const [isValidBad, setIsValidBed] = useState(false);
  const [isValidPrice, setIsValidPrice] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = async dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleProvinceClick = async e => {
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
    if (!isValid && !isValidBad && !isValidPrice) {
      const pageble = await fetch(`http://localhost:8080/sign_in/date?start=${startForm}&end=${endForm}`, {
        method: "GET"
      });
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    }
    if (!isValid && !isValidBad && isValidPrice) {
      const pageble = await fetch(
        `http://localhost:8080/sign_in/date_price?start=${startForm}&end=${endForm}&price=${prezzo}`,
        {
          method: "GET"
        }
      );
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        dispatch(addProvince("Tutte le province"));
        dispatch(addBeds(null));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    }

    if (isValid && isValidBad && isValidPrice) {
      const pageble = await fetch(
        `http://localhost:8080/sign_in/date_prov_beds_price?start=${startForm}&end=${endForm}&beds=${newBeds}&province=${province}&price=${prezzo}`,
        {
          method: "GET"
        }
      );
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    }

    if (!isValid && isValidBad && !isValidPrice) {
      const pageble = await fetch(
        `http://localhost:8080/sign_in/date_beds?start=${startForm}&end=${endForm}&beds=${newBeds}`,
        {
          method: "GET"
        }
      );
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    }
    if (isValid && !isValidBad && !isValidPrice) {
      const pageble = await fetch(
        `http://localhost:8080/sign_in/date_province?start=${startForm}&end=${endForm}&province=${province}`,
        {
          method: "GET"
        }
      );
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    }

    if (isValid && !isValidBad && isValidPrice) {
      const pageble = await fetch(
        `http://localhost:8080/sign_in/date_province_price?start=${startForm}&end=${endForm}&province=${province}&price=${prezzo}`,
        {
          method: "GET"
        }
      );
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    }
    if (!isValid && isValidBad && isValidPrice) {
      const pageble = await fetch(
        `http://localhost:8080/sign_in/date_beds_price?start=${startForm}&end=${endForm}&beds=${newBeds}&price=${prezzo}`,
        {
          method: "GET"
        }
      );
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    }
    if (isValid && isValidBad && !isValidPrice) {
      const pageble = await fetch(
        `http://localhost:8080/sign_in/date_prov_beds?start=${startForm}&end=${endForm}&beds=${newBeds}&province=${province}`,
        {
          method: "GET"
        }
      );
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    }
  };

  const handlerBeds = e => {
    setNewBeds(e.target.value);
    if (e.target.value === "0") {
      setIsValidBed(false);
    } else {
      setIsValidBed(true);
    }
  };
  const handlerPrezzo = e => {
    if (e.target.value === 0) {
      setIsValidPrice(false);
    } else {
      setIsValidPrice(true);
      setPrezzo(e.target.value);
    }
  };
  const handleProvinceChange = event => {
    setProvince(event.target.value);
    if (event.target.value === "Tutte le province" || event.target.value === null) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
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
  }, []);

  return (
    <div
      className="FiltriSideBar"
      onClick={() => setError(false)}>
      {error ? <Alert variant="danger">Non ci sono disponibilita</Alert> : <></>}
      <Container>
        <Row className="d-flex py-3 flex-column">
          <Col>
            <Row className="Titles row-cols-1 px-4 d-flex gap-5">
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
                    <option value={0}>cambia i posti letto</option>
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
                <Form.Range
                  value={prezzo}
                  max={500}
                  onChange={handlerPrezzo}
                />
                <div className="d-flex justify-content-between">
                  <p>0€</p>
                  <p>500€</p>
                </div>
              </Col>
              <div
                className="navItemsVehicle buttonCard"
                onClick={handlerSubmit}>
                <p
                  style={{
                    zIndex: 99999,
                    fontFamily: "Rowdies, sans-serif"
                  }}
                  className="text-decoration-none m-0 text-white">
                  Modifica
                </p>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default FiltriSideBar;
