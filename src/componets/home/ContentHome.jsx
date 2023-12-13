import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Route } from "react-router";

const ContentHome = () => {
  const apiNews = "2b1292ceaa8e43c8a98b7e54f5d39a53";
  const [content, setContent] = useState("");
  const [articles, setArticles] = useState(null);
  const [url, setUrl] = useState("");
  const NewsFetch = async () => {
    const news = await fetch(`https://newsapi.org/v2/everything?q=van+outdoor&language=it&apiKey=${apiNews}`, {
      method: "GET"
    });
    if (news.ok) {
      const data = await news.json();
      console.log(data);
      setArticles(data.articles);
      console.log(articles);
      setContent(data.articles[0].description);
      setUrl(data.articles[0].url);
    }
  };
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
    <Container>
      <h2 className="text-black">News</h2>
      <Row>
        {articles ? (
          articles.map((article, i) => (
            <Col
              key={i}
              className="d-flex flex-column"
              sm={3}>
              <Card>
                <Card.Img
                  variant="top"
                  alt={article.title}
                  src={article.urlToImage}
                />
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>{article.description}</Card.Text>
                  <Button href={article.url}>url</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <></>
        )}
      </Row>
      <Button onClick={NewsFetch}>NEWS</Button>
      <Button href={url}>URL</Button>
    </Container>
  );
};
export default ContentHome;
