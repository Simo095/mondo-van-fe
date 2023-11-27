import { Button, Col, Form, Image, InputGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import placeholderUser from "../assets/user_placeholder.png";
import { useSelector } from "react-redux";
import logo from "../assets/LogoCapstone.png";
const NavBar = () => {
  const user = useSelector(state => state.login.user);
  return (
    <div className="NavBar">
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        expand="lg"
        className="bg-body-tertiary">
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
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/idea">L'idea</Nav.Link>
              <Nav.Link href="/van">Mezzi</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/register">Sign in</Nav.Link>
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
                  <Nav.Link href="/Login">Login</Nav.Link>
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
