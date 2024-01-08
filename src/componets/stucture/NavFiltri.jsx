import { useEffect, useState } from "react";
import { Alert, Container, Form, FormSelect, Nav } from "react-bootstrap";
import { IoMdSearch } from "react-icons/io";
import ReactDatePicker from "react-datepicker";
import { addBeds, addProvince, addResult } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const NavFiltri = () => {
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
  const [typeVan, setTypeVan] = useState("Tutti i tipi");
  const [supplyVan, setSupplyVan] = useState("Tutti i tipi");
  const [isValid, setIsValid] = useState(false);
  const [isValidBad, setIsValidBed] = useState(false);
  const [isValidPrice, setIsValidPrice] = useState(false);
  const [isValidType, setIsValidType] = useState(false);
  const [isValidSupply, setIsValidSupply] = useState(false);
  const [error, setError] = useState(false);
  const [changePrice, setChangePrice] = useState(false);
  const [changeProvince, setChangeProvince] = useState(false);
  const [changeBeds, setChangeBeds] = useState(false);
  const [changeDate, setChangeDate] = useState(false);
  const [changeType, setChangeType] = useState(false);
  const [changeSupply, setChangeSupply] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const handleProvinceChange = event => {
    setProvince(event.target.value);
    if (event.target.value === "Tutte le province" || event.target.value === null) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

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
    <div className="MediaQueryFiltri">
      <Nav
        className="d-flex justify-content-center  border-0"
        variant="tabs"
        defaultActiveKey="#first">
        <Nav.Item
          className="navItemsVehicle  d-flex rounded flex-column"
          onClick={() => {
            setChangeBeds(false);
            setChangeDate(!changeDate);
            setChangePrice(false);
            setChangeProvince(false);
            setChangeType(false);
            setChangeSupply(false);
          }}>
          <Nav.Link className="text-decoration-none  border-0 text-white">Cambia Date</Nav.Link>
        </Nav.Item>

        <Nav.Item
          className="navItemsVehicle "
          onClick={() => {
            setChangeType(false);
            setChangeSupply(false);
            setChangeBeds(false);
            setChangeDate(false);
            setChangePrice(false);
            setChangeProvince(!changeProvince);
          }}>
          <Nav.Link className="text-decoration-none border-0 text-white">Cambia Provincia</Nav.Link>
        </Nav.Item>
        <Nav.Item
          className="navItemsVehicle "
          onClick={() => {
            setChangeType(false);
            setChangeSupply(false);
            setChangeBeds(!changeBeds);
            setChangeDate(false);
            setChangePrice(false);
            setChangeProvince(false);
          }}>
          <Nav.Link className="text-decoration-none border-0 text-white">Cambia Posti Letto</Nav.Link>
        </Nav.Item>
        <Nav.Item
          className="navItemsVehicle "
          onClick={() => {
            setChangeType(false);
            setChangeSupply(false);
            setChangeBeds(false);
            setChangeDate(false);
            setChangePrice(!changePrice);
            setChangeProvince(false);
          }}>
          <Nav.Link className="text-decoration-none border-0 text-white">Cambia Prezzo</Nav.Link>
        </Nav.Item>
        <Nav.Item
          className="navItemsVehicle "
          onClick={() => {
            setChangeSupply(false);
            setChangeBeds(false);
            setChangeDate(false);
            setChangeType(!changeType);
            setChangePrice(false);
            setChangeProvince(false);
          }}>
          <Nav.Link className="text-decoration-none border-0 text-white">Cambia Tipo</Nav.Link>
        </Nav.Item>
        <Nav.Item
          className="navItemsVehicle "
          onClick={() => {
            setChangeType(false);
            setChangePrice(false);
            setChangeBeds(false);
            setChangeDate(false);
            setChangeSupply(!changeSupply);
            setChangeProvince(false);
          }}>
          <Nav.Link className="text-decoration-none border-0 text-white">Cambia Carburante</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <IoMdSearch
            color="white"
            fontSize={30}
            style={{ cursor: "pointer" }}
            onClick={handlerSubmit}
          />
        </Nav.Item>
      </Nav>

      {changeDate && (
        <Container
          onClick={() => setError(false)}
          className="my-3"
          style={{ width: "260px" }}>
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
            selectsDisabledDaysInRange
          />
        </Container>
      )}

      {changeProvince && (
        <Container
          className="my-3"
          style={{ width: "260px" }}
          onClick={() => setError(false)}>
          <FormSelect
            className=""
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
        </Container>
      )}
      {changeBeds && (
        <Container
          className="my-3"
          style={{ width: "260px" }}
          onClick={() => setError(false)}>
          <FormSelect
            className="mb-3"
            value={newBeds}
            onChange={handlerBeds}>
            <option value={0}>Tutti i letti</option>
            <option value={2}>2 letti</option>
            <option value={3}>3 letti</option>
            <option value={4}>4 letti</option>
            <option value={5}>5 letti</option>
            <option value={6}>6 letti</option>
          </FormSelect>
        </Container>
      )}
      {changePrice && (
        <Container
          className="my-3"
          style={{ width: "260px" }}>
          <Form.Range
            value={prezzo}
            max={500}
            onClick={() => setError(false)}
            onChange={handlerPrezzo}
          />
          <div className="d-flex text-white justify-content-between">
            <p>0€</p>
            <p>{prezzo}€</p>
            <p>500€</p>
          </div>
        </Container>
      )}
      {changeType && (
        <Container
          className="my-3"
          style={{ width: "260px" }}
          onClick={() => setError(false)}>
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
        </Container>
      )}
      {changeSupply && (
        <Container
          className="my-3"
          style={{ width: "260px" }}
          onClick={() => setError(false)}>
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
        </Container>
      )}
      {error ? (
        <Alert
          className="my-4"
          variant="danger">
          Non ci sono disponibilità
        </Alert>
      ) : (
        <></>
      )}
    </div>
  );
};
export default NavFiltri;
