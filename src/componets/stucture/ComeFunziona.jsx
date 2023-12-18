import { Col, Container, Image, Row } from "react-bootstrap";

import NavBar from "./NavBar";
import Footer from "./Footer";

import logo from "../../assets/img/LogoVanWorld.png";
import comunity from "../../assets/img/Comunity.jpeg";

const ComeFunziona = () => {
  return (
    <div className="ComeFunziona">
      <NavBar />
      <Container style={{ height: "90vh" }}>
        <Row className="d-flex align-items-center">
          <Col sm={4}>
            <Image
              width={400}
              src={logo}
            />
          </Col>
          <Col sm={6}>
            <h3>Noleggiare un furgone con Van World è semplice e veloce. Basta Registrarsi.</h3>
            <p>
              Cerca il furgone che fa per te.<br></br> Una volta registrato, puoi iniziare a cercare il furgone che fa
              per te e ricorda che non è un parco auto e a non abbiamo qualsiasi tipo di mezzo, solo quelli che gli
              utenti hanno intenzione di condividere. Il progetto van è un'iniziativa che mira a creare una comunità di
              persone che condividono la passione per i van. L'obiettivo del progetto è fornire una piattaforma per le
              persone che desiderano imparare di più sui van, trovare altri appassionati di van e condividere le loro
              esperienze.
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <p>
              Il progetto VanWorld offre una varietà di risorse per la comunità. Queste risorse includono: Un forum
              online dove le persone possono discutere di van, condividere storie e chiedere consigli. Un blog che offre
              notizie, recensioni e informazioni sui van. Un calendario di eventi che include raduni, fiere e altri
              eventi per appassionati di van. <br></br>
              <br></br>
              Il progetto VanWorld è basato sulla convinzione che i van siano più di semplici veicoli. Sono un modo di
              vivere, un modo di viaggiare e un modo di vedere il mondo. Il progetto van mira a celebrare questa
              passione e a creare una comunità di persone che condividono questo amore. La comunità del progetto van è
              composta da persone di tutte le età, background e interessi. Sono persone che amano i van, che vogliono
              imparare di più sui van e che vogliono condividere la loro passione con gli altri.
              <br></br>
              <br></br>
              Il progetto VanWorld è un'iniziativa entusiasmante che sta rapidamente crescendo. Se sei un appassionato
              di van, ti invitiamo a partecipare alla comunità e a aiutarci a costruire una comunità forte e vibrante
              per gli appassionati di van.
            </p>
          </Col>
          <Col>
            <Image
              thumbnail
              src={comunity}
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};
export default ComeFunziona;

// Noleggiare un furgone con Van World è semplice e veloce. Basta Registrarsi.

// Cerca il furgone che fa per te
// Una volta registrato, puoi iniziare a cercare il furgone che fa per te. Ricorda che non è un parco auto e a non abbiamo qualsiasi tipo di mezzo, solo quelli che gli utenti hanno intenzione di condividere.

// Prenota il furgone
// Quando hai trovato il furgone che vuoi noleggiare, puoi procedere con la prenotazione. Dovrai indicare le date di ritiro e riconsegna, il numero di passeggeri.

// Pagare la prenotazione
// Al momento della prenotazione, dovrai pagare un anticipo del 50% del prezzo totale. Il saldo dovrà essere pagato alla consegna del mezzo da parte del proprietario.

// Ritirare il furgone
// Al momento del ritiro del furgone, dovrai presentare il tuo documento d identità e la carta di credito utilizzata per la prenotazione.

// Guidare il furgone
// Il furgone è tuo per tutto il periodo di noleggio. Puoi guidarlo ovunque tu voglia, in Italia e all'estero.

// Riconsegnare il furgone
// Al momento della riconsegna del furgone, dovrai controllare con il proprietario se ci sono danni da segnalare.

// Come mettere un furgone on line con [nome sito]

// Se hai un furgone che vuoi mettere a disposizione degli altri, puoi farlo con [nome sito]. Basta seguire questi passaggi:

// Registrati
// Per poter mettere un furgone on line, devi prima registrarti a [nome sito]. Puoi farlo con un account Facebook, Google o e-mail.

// Aggiungi il tuo furgone
// Una volta registrato, puoi iniziare ad aggiungere il tuo furgone. Dovrai indicare la marca, il modello, l'anno di immatricolazione, il prezzo, la posizione e altri dettagli.

// Pubblica il tuo annuncio
// Una volta che hai aggiunto il tuo furgone, puoi pubblicarlo. [Nome sito] si occuperà di renderlo visibile agli altri utenti.

// Vantaggi di noleggiare un furgone con [nome sito]

// Noleggiare un furgone con [nome sito] offre numerosi vantaggi, tra cui:

// Prezzi vantaggiosi: I prezzi dei noleggi su [nome sito] sono generalmente più convenienti rispetto a quelli delle agenzie di noleggio tradizionali.
// Ampia scelta: [Nome sito] offre un'ampia scelta di furgoni, per soddisfare tutte le esigenze.
// Servizio di qualità: [Nome sito] offre un servizio di qualità, che garantisce la sicurezza e la soddisfazione degli utenti.
// Vantaggi di mettere un furgone on line con [nome sito]

// Se hai un furgone che non usi spesso, puoi metterlo a disposizione degli altri con [nome sito]. Questo ti permetterà di guadagnare un extra e di aiutare altri viaggiatori a trovare un mezzo di trasporto conveniente.

// I vantaggi di mettere un furgone on line con [nome sito] includono:

// Guadagno extra: Puoi guadagnare un extra mettendo a disposizione il tuo furgone.
// Aiuto agli altri: Puoi aiutare altri viaggiatori a trovare un mezzo di trasporto conveniente.
// Servizio sicuro: [Nome sito] offre un servizio sicuro, che protegge sia i proprietari che i viaggiatori.
// Conclusione

// [Nome sito] è una piattaforma semplice e conveniente che ti permette di noleggiare o mettere a disposizione un furgone. Se stai cercando un modo per viaggiare in modo economico e sostenibile, [nome sito] è la soluzione che fa per te.
