import { useEffect, useState } from "react";
import { Alert, Col, Container, Form, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { resultConditions } from "../../redux/actions/fetchResultsConditions";

const FiltriSideBar = () => {
  const startDateState = useSelector(state => state.result.startDate);
  const endDateState = useSelector(state => state.result.endDate);
  const provinceState = useSelector(state => state.result.province);
  const bedsState = useSelector(state => state.result.beds);
  const token = useSelector(state => state.login.token);

  const [startDate, setStartDate] = useState(new Date(startDateState));
  const [endDate, setEndDate] = useState(new Date(endDateState));
  const [provinces, setProvinces] = useState();
  const [province, setProvince] = useState(provinceState === null ? "Tutte le province" : provinceState);
  const [prezzo, setPrezzo] = useState(0);
  const [newBeds, setNewBeds] = useState(bedsState === null ? "Qualsiasi posto letto" : bedsState);
  const [typeVan, setTypeVan] = useState("Tutti i tipi");
  const [supplyVan, setSupplyVan] = useState("Tutti i tipi");
  const [isValid, setIsValid] = useState(false);
  const [isValidType, setIsValidType] = useState(false);
  const [isValidSupply, setIsValidSupply] = useState(false);
  const [isValidBad, setIsValidBed] = useState(false);
  const [isValidPrice, setIsValidPrice] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerSubmit = async e => {
    e.preventDefault();
    const startForm = startDate.toLocaleDateString("fr-CA");
    const endForm = endDate.toLocaleDateString("fr-CA");
    dispatch(
      resultConditions(
        startForm,
        endForm,
        prezzo,
        province,
        newBeds,
        supplyVan,
        typeVan,
        token,
        navigate,
        setError,
        isValid,
        isValidBad,
        isValidPrice,
        isValidSupply,
        isValidType
      )
    );
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
  const onChange = async dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const handlerBeds = e => {
    setNewBeds(e.target.value);
    if (e.target.value === "0") {
      setIsValidBed(false);
    } else {
      setIsValidBed(true);
    }
  };
  const handlerTypeVan = e => {
    setTypeVan(e.target.value);
    if (e.target.value === "Tutti i tipi") {
      setIsValidType(false);
    } else {
      setIsValidType(true);
    }
  };
  const handlerSupplyVan = e => {
    setSupplyVan(e.target.value);
    if (e.target.value === "Tutti i tipi") {
      setIsValidSupply(false);
    } else {
      setIsValidSupply(true);
    }
  };
  const handlerPrezzo = e => {
    if (e.target.value === "0") {
      setIsValidPrice(false);
    } else {
      setPrezzo(e.target.value);
      setIsValidPrice(true);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="FiltriSideBar"
      onClick={() => setError(false)}>
      {error ? <Alert variant="danger">Non ci sono disponibilita</Alert> : <></>}
      <Container>
        <Row className="d-flex py-3 flex-column">
          <Col>
            <Row className="row-cols-1 px-4 d-flex gap-3">
              <Col className="d-flex flex-column">
                <FormLabel className="Titles">Cambia date</FormLabel>
                <FormGroup>
                  <ReactDatePicker
                    selected={startDate}
                    id="giorni"
                    name="giorni"
                    autoComplete="off"
                    className="form-control"
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat={"dd-MM-yyyy"}
                    selectsRange
                    selectsDisabledDaysInRange></ReactDatePicker>
                </FormGroup>
              </Col>
              <Col>
                <FormLabel className="Titles">Cambia luogo</FormLabel>
                <Form.Group>
                  <FormSelect
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
                <FormLabel className="Titles">Cambia posti letto</FormLabel>
                <FormGroup>
                  <FormSelect
                    value={newBeds}
                    onChange={handlerBeds}
                    onClick={() => setError(false)}>
                    <option value={0}>Qualsiasi numero</option>
                    <option value={2}>2 letti e meno</option>
                    <option value={3}>3 letti</option>
                    <option value={4}>4 letti</option>
                    <option value={5}>5 letti</option>
                    <option value={6}>6 letti e più</option>
                  </FormSelect>
                </FormGroup>
              </Col>
              <Col>
                <FormLabel className="Titles">Cambia tipo di mezzo</FormLabel>
                <FormGroup>
                  <FormSelect
                    value={typeVan}
                    onChange={handlerTypeVan}
                    onClick={() => setError(false)}>
                    <option value={"Tutti i tipi"}>Tutti i tipi</option>
                    <option value={"CAMPER"}>Camper</option>
                    <option value={"VAN"}>Van</option>
                    <option value={"CAMPERIZED_JEEP"}>Jeep attrezzata</option>
                    <option value={"ROOFTOOP_CAR"}>Macchina attrezzata</option>
                    <option value={"OTHER"}>Altro</option>
                  </FormSelect>
                </FormGroup>
              </Col>
              <Col>
                <FormLabel className="Titles">Cambia tipo di carburante</FormLabel>
                <FormGroup>
                  <FormSelect
                    value={supplyVan}
                    onChange={handlerSupplyVan}
                    onClick={() => setError(false)}>
                    <option value={"Tutti i tipi"}>Tutti i tipi</option>
                    <option value="GASOLINE">Benzina</option>
                    <option value="DIESEL">Diesel</option>
                    <option value="LPG_DIESEL">GPL e Diesel</option>
                    <option value="ELECTRIC">Elettrico</option>
                    <option value="HYBRID">Ibrido</option>
                  </FormSelect>
                </FormGroup>
              </Col>
              <Col>
                <FormLabel className="Titles">Cambia prezzo: {prezzo}€</FormLabel>
                <Form.Range
                  value={prezzo}
                  min={0}
                  max={500}
                  onChange={e => handlerPrezzo(e)}
                />
                <div className="d-flex justify-content-between">
                  <p>0€</p>
                  <p>500€</p>
                </div>
              </Col>
              <div
                className="navItemsVehicle text-center"
                onClick={handlerSubmit}>
                <p
                  style={{
                    zIndex: 99999,
                    fontFamily: "Rowdies, sans-serif",
                    cursor: "pointer"
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
