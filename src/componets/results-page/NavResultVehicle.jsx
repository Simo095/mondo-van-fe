import { Nav } from "react-bootstrap";

const NavResultVehicle = ({ setMotorizzazione, setInterni, setAnnuncio }) => {
  return (
    <Nav
      variant="tabs"
      className="mt-3"
      defaultActiveKey="#first border-0">
      <Nav.Item
        className="navItemsVehicle"
        onClick={() => {
          setMotorizzazione(false);
          setInterni(true);
          setAnnuncio(false);
        }}>
        <Nav.Link>Interni</Nav.Link>
      </Nav.Item>
      <Nav.Item
        className="navItemsVehicle"
        onClick={() => {
          setMotorizzazione(false);
          setInterni(false);
          setAnnuncio(true);
        }}>
        <Nav.Link>Annuncio</Nav.Link>
      </Nav.Item>
      <Nav.Item
        className="navItemsVehicle"
        onClick={() => {
          setMotorizzazione(true);
          setInterni(false);
          setAnnuncio(false);
        }}>
        <Nav.Link>Specifiche tecniche</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};
export default NavResultVehicle;
