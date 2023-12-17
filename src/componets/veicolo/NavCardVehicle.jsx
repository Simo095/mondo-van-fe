import { Nav } from "react-bootstrap";

const NavCardVehicle = ({ setMotorizzazione, setCreaAnnuncio, setInterni, setFoto }) => {
  return (
    <Nav
      className=""
      variant="tabs"
      defaultActiveKey="#first">
      <Nav.Item
        className="navItemsVehicle buttonCard"
        onClick={() => {
          setMotorizzazione(false);
          setCreaAnnuncio(false);
          setInterni(false);
          setFoto(true);
        }}>
        <Nav.Link className="text-decoration-none text-white">Foto Veicolo</Nav.Link>
      </Nav.Item>
      <Nav.Item
        className="navItemsVehicle buttonCard"
        onClick={() => {
          setMotorizzazione(false);
          setCreaAnnuncio(false);
          setInterni(true);
          setFoto(false);
        }}>
        <Nav.Link className="text-decoration-none text-white">Interni</Nav.Link>
      </Nav.Item>
      <Nav.Item
        className="navItemsVehicle buttonCard"
        onClick={() => {
          setCreaAnnuncio(true);
          setMotorizzazione(false);
          setInterni(false);
          setFoto(false);
        }}>
        <Nav.Link className="text-decoration-none text-white">Annuncio</Nav.Link>
      </Nav.Item>
      <Nav.Item
        className="navItemsVehicle buttonCard"
        onClick={() => {
          setMotorizzazione(true);
          setCreaAnnuncio(false);
          setInterni(false);
          setFoto(false);
        }}>
        <Nav.Link className="text-decoration-none text-white">Motorizzazione</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};
export default NavCardVehicle;
