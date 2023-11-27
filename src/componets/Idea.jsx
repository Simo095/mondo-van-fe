import { Col, Container, Row } from "react-bootstrap";
import { Route } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Idea = () => {
  return (
    <>
      <NavBar />
      <Container style={{ height: "90vh" }}>
        <Row>
          <Col sm={4}>
            <p>IMMAGINE</p>
          </Col>
          <Col sm={6}>
            <p>
              Il progetto van è un'iniziativa che mira a creare una comunità di persone che condividono la passione per
              i van. L'obiettivo del progetto è fornire una piattaforma per le persone che desiderano imparare di più
              sui van, trovare altri appassionati di van e condividere le loro esperienze.
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <p>IMMAGINE</p>
          </Col>
          <Col sm={6}>
            <p>
              Il progetto van offre una varietà di risorse per la comunità. Queste risorse includono: Un forum online
              dove le persone possono discutere di van, condividere storie e chiedere consigli. Un blog che offre
              notizie, recensioni e informazioni sui van. Un calendario di eventi che include raduni, fiere e altri
              eventi per appassionati di van.
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <p>IMMAGINE</p>
          </Col>
          <Col sm={6}>
            <p>
              Il progetto van è basato sulla convinzione che i van siano più di semplici veicoli. Sono un modo di
              vivere, un modo di viaggiare e un modo di vedere il mondo. Il progetto van mira a celebrare questa
              passione e a creare una comunità di persone che condividono questo amore. La comunità del progetto van è
              composta da persone di tutte le età, background e interessi. Sono persone che amano i van, che vogliono
              imparare di più sui van e che vogliono condividere la loro passione con gli altri.
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>IMMAGINE</Col>
          <Col sm={6}>
            Il progetto van è un'iniziativa entusiasmante che sta rapidamente crescendo. Se sei un appassionato di van,
            ti invitiamo a partecipare alla comunità e a aiutarci a costruire una comunità forte e vibrante per gli
            appassionati di van.
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};
export default Idea;
