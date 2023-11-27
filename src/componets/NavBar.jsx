import { Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
const NavBar = () => {
  const user = useSelector(state => state.login.user);
  return (
    <div className="NavBar">
      <Navbar
        expand="lg"
        className="bg-white">
        <Container>
          <Navbar.Brand href="/">
            {/* <Image
            src={logo}
            width={250}
          /> */}
            MONDO VAN
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex justify-content-center flex-grow-1">
              <Nav.Link href="/register_user">Prenota un Van</Nav.Link>
              <Nav.Link href="/register_van">Iscrivi il tuo mezzo</Nav.Link>
              <Nav.Link href="/rules">Come funziona?</Nav.Link>
            </Nav>
            <Nav>
              {user ? (
                <>
                  <Image
                    src={user}
                    alt="image profile"
                    roundedCircle
                    style={{ width: "60px", height: "60px", marginInline: "1rem" }}
                  />
                  <NavDropdown id="basic-nav-dropdown">
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Setting</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Others</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link href="/register_user">Sign in</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
