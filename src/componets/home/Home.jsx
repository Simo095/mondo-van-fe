import { Button, Col, Container, Row } from "react-bootstrap";
import sfondoHome from "../../assets/VW-Giallo.jpg";
import NavBar from "../NavBar";
import SideBar from "../SideBar";
import Footer from "../Footer";
import FormHome from "./FormHome";
import { useEffect, useState } from "react";
import ContentHome from "./ContentHome";

const Home = () => {
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const [objFetch, setObjFetch] = useState(null);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const getPosition = async () => {
    try {
      await navigator.geolocation.getCurrentPosition(
        position => {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
          console.log("hey");
        },
        err => {
          console.log(err);
        }
      );
      // setCoordinates({
      //   latitude: lat,
      //   longitude: long
      // });
    } catch (error) {
      console.error("Error:", error.message);
    }
    if (lat !== "") {
      getMeteo();
    }
  };
  const getMeteo = async () => {
    const response = await fetch(
      `https:api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}10&appid=9c0ece9ecabc211f28776c581ffc21e8`
    );
    if (response.ok) {
      const previsione = await response.json();

      const objToday = {
        img: `https://openweathermap.org/img/wn/${previsione.weather[0].icon}@2x.png`,
        percepita: (previsione.main.feels_like - 273.15).toFixed(1),
        temp: (previsione.main.temp - 273.15).toFixed(1),
        umidita: previsione.main.humidity,
        minima: (previsione.main.temp_min - 273.15).toFixed(1),
        massima: (previsione.main.temp_max - 273.15).toFixed(1),
        descrizione: previsione.weather[0].description
      };
      setObjFetch({ objToday });
      console.log(objFetch);
    } else {
      alert("Error fetching results");
    }
  };

  useEffect(() => {
    getPosition();
  }, []);

  return (
    <div className="Home">
      <Row
        className="d-flex flex-row"
        style={{
          height: "100vh"
        }}>
        <Col
          style={{
            backgroundImage: `url(${sfondoHome})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            height: "100vh"
          }}>
          <NavBar />
          <Row className="mt-5">
            <Col className="d-flex flex-column justify-content-center align-items-center">
              <Row style={{ height: "20vh" }}>
                <Col className="d-flex flex-column align-items-center gap-4">
                  <FormHome />
                </Col>
              </Row>
              <Container
                fluid
                className="d-flex flex-column align-items-center">
                <p className="shadow-p">
                  NOLEGGIA UN VAN PER LA TUA PROSSIMA VACANZA, E VIVI UN AVVENTUA INDIMENTICABILE
                </p>
              </Container>
            </Col>
          </Row>
        </Col>
      </Row>
      <ContentHome />
      <Footer />
    </div>
  );
};
export default Home;
