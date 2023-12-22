import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div
      className="Register"
      style={{ height: "100vh" }}>
      <div className="d-flex justify-content-between">
        <h1 className="logo text-black fs-1">Registrati ed entra a far parte della comunity!</h1>
        <div className="d-flex align-items-center">
          Home
          <IoArrowBackCircleOutline
            onClick={() => {
              navigate("/");
            }}
            className="fs-1"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <Container>
        <Row className="d-flex RegisterRow flex-grow-1 justify-content-center align-items-center">
          <Col
            className="d-flex justify-content-center align-items-center"
            sm={5}>
            <Image
              fluid
              className="e2e-ImageModuleContent-img ImageModuleContent-mainImage-IG1"
              srcSet="https://mir-s3-cdn-cf.behance.net/project_modules/disp/3f483f97004499.5ebb3291132b2.gif 500w"
              alt="Travel GIFs"
              shouldblockrightclickevents="true"
              style={{ marginTop: "2rem", minWidth: "350px" }}
            />
          </Col>
          <Col
            className="d-flex flex-column justify-content-center align-items-center"
            sm={7}
            style={{
              overflow: "unset",
              backgroundRepeat: "no-repeat",
              backgroundSize: "470px",
              backgroundPositionY: "66%",
              backgroundPositionX: "83%",
              height: "90vh"
            }}>
            <h3 className="logo text-black fs-3">
              Noleggiare un furgone con Van World è semplice e veloce. Basta Registrarsi.
            </h3>
            <Button
              href="/register_owner"
              className="mt-5"
              style={{ background: "transparent", border: "none", color: "black" }}>
              Registrati come proprietario
            </Button>
            {/* <h3 className="logo text-black fs-5 mt-3">o</h3> */}
            <Button
              href="/register_customer"
              style={{ background: "transparent", border: "none", color: "black" }}>
              Registrati come cliente
            </Button>
            {/* <h3 className="logo text-black fs-5 mt-3">Oppure</h3> */}
            <Button
              href="/login"
              style={{ background: "transparent", border: "none", color: "black" }}>
              Effettua il login
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Register;
