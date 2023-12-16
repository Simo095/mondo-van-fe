import { Nav } from "react-bootstrap";

const NavCardVehicle = ({ setMotorizzazione, setCreaAnnuncio, setInterni, setFoto }) => {
  return (
    <Nav
      className="bg-secondary"
      variant="tabs"
      defaultActiveKey="#first">
      <Nav.Item
        className="navItemsVehicle"
        onClick={() => {
          setMotorizzazione(false);
          setCreaAnnuncio(false);
          setInterni(false);
          setFoto(true);
        }}>
        <Nav.Link>Foto Veicolo</Nav.Link>
      </Nav.Item>
      <Nav.Item
        className="navItemsVehicle"
        onClick={() => {
          setMotorizzazione(false);
          setCreaAnnuncio(false);
          setInterni(true);
          setFoto(false);
        }}>
        <Nav.Link>Interni</Nav.Link>
      </Nav.Item>
      <Nav.Item
        className="navItemsVehicle"
        onClick={() => {
          setCreaAnnuncio(true);
          setMotorizzazione(false);
          setInterni(false);
          setFoto(false);
        }}>
        <Nav.Link>Annuncio</Nav.Link>
      </Nav.Item>
      <Nav.Item
        className="navItemsVehicle"
        onClick={() => {
          setMotorizzazione(true);
          setCreaAnnuncio(false);
          setInterni(false);
          setFoto(false);
        }}>
        <Nav.Link>Motorizzazione</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};
export default NavCardVehicle;
