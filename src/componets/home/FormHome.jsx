import { useEffect, useState } from "react";
import { Alert, Button, Form, FormSelect } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addResult } from "../../redux/actions";
const FormHome = () => {
  const [provinces, setProvinces] = useState();
  const [province, setProvince] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [beds, setBeds] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isValidBad, setIsValidBed] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerSubmit = async e => {
    e.preventDefault();
    const start = startDate.toLocaleDateString("fr-CA");
    const end = endDate.toLocaleDateString("fr-CA");
    if (isValid && isValidBad) {
      const pageble = await fetch(
        `http://localhost:8080/sign_in/date_prov_beds?start=${start}&end=${end}&beds=${beds}&province=${province}`,
        {
          method: "GET"
        }
      );
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page/${start}/${end}/${beds}/${province}`);
      } else {
        setError(true);
      }
    }

    if (!isValid && !isValidBad) {
      const pageble = await fetch(`http://localhost:8080/sign_in/date?start=${start}&end=${end}`, {
        method: "GET"
      });
      if (pageble.ok) {
        const content = await pageble.json();
        console.log(content);
        dispatch(addResult(content.content));
        navigate(`/results_page/${start}/${end}`);
      } else {
        setError(true);
      }
    }
    if (!isValid && isValidBad) {
      const pageble = await fetch(`http://localhost:8080/sign_in/date_beds?start=${start}&end=${end}&beds=${beds}`, {
        method: "GET"
      });
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page/${start}/${end}/${beds}`);
      } else {
        setError(true);
      }
    }
    if (isValid && !isValidBad) {
      const pageble = await fetch(
        `http://localhost:8080/sign_in/date_province?start=${start}&end=${end}&province=${province}`,
        {
          method: "GET"
        }
      );
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page/${start}/${end}/${province}`);
      } else {
        setError(true);
      }
    }
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

  const handleProvinceChange = async event => {
    event.preventDefault();
    setProvince(event.target.value);
  };
  const handlerBeds = async e => {
    e.preventDefault();
    setBeds(e.target.value);
  };

  const onChange = dates => {
    setError(false);
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    handleProvinceClick();
    setIsValid(province ? true : false);
    setIsValidBed(beds ? true : false);
    if (province === "Tutte le province") {
      setIsValid(false);
    }
    if (beds === "Qualsiasi posto letto") {
      setIsValidBed(false);
    }
  }, [province, beds]);

  return (
    <>
      <Form
        id="formPrimo"
        onSubmit={handlerSubmit}
        className="d-flex FormHome gap-1 mt-5">
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
        <Form.Group>
          <ReactDatePicker
            selected={startDate}
            id="giorni"
            name="giorni"
            autoComplete="off"
            required
            className="form-control btn-radius-start-0 btn-radius-end-0"
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            dateFormat={"dd-MM-yyyy"}
            selectsRange
            selectsDisabledDaysInRange
            placeholderText="Quando vuoi partire?"
          />
        </Form.Group>
        <Form.Group>
          <FormSelect
            value={beds}
            onChange={handlerBeds}
            name="letto"
            required
            onClick={() => setError(false)}
            className="btn-radius-start-0 btn-radius-end-0">
            <option value="Qualsiasi posto letto">Qualsiasi posto letto</option>
            <option value={1}>1 posto letto</option>
            <option value={2}>2 posti letto</option>
            <option value={3}>3 posti letto</option>
            <option value={4}>4 posti letto</option>
            <option value={5}>5 posti letto</option>
            <option value={6}>6 posti letto</option>
          </FormSelect>
        </Form.Group>
        <Button
          form="formPrimo"
          type="submit"
          className="btn-radius-start-0 btn-Form"
          style={{ backgroundColor: "#CF781D", borderColor: "#CF781D" }}>
          Parti!
        </Button>
      </Form>
      {error ? <Alert variant="danger">Non ci sono disponibilita</Alert> : <></>}
    </>
  );
};
export default FormHome;
