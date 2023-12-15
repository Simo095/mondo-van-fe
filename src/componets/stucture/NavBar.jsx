import { Image, NavItem } from "react-bootstrap";
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
        data-bs-theme="dark"
        className="shadow-home">
        <Container>
          <Navbar.Brand
            href="/"
            className="logo">
            VAN WORLD
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="nav-toggler"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex  flex-grow-1">
              {user ? (
                <></>
              ) : (
                <>
                  <NavItem>
                    <Nav.Link
                      className="color-link-nav"
                      href="/register_customer">
                      PRENOTA UN VAN
                    </Nav.Link>
                  </NavItem>
                  <NavItem>
                    <Nav.Link
                      className="color-link-nav"
                      href="/register_owner">
                      ISCRIVI IL TUO VAN
                    </Nav.Link>
                  </NavItem>
                  <NavItem className="flex-grow-1">
                    <Nav.Link
                      className="color-link-nav"
                      href="/rules">
                      COME FUNZIONA?
                    </Nav.Link>
                  </NavItem>
                  <Nav.Link
                    className="text-white"
                    href="/login">
                    LOGIN
                  </Nav.Link>
                </>
              )}
            </Nav>

            <Nav>
              {user ? (
                user.role === "CUSTOMER" ? (
                  <>
                    <Image
                      src={user.avatar}
                      alt="image profile"
                      roundedCircle
                      style={{ width: "60px", height: "60px", marginInline: "1rem" }}
                    />
                    <NavDropdown
                      id="basic-nav-dropdown"
                      align="end">
                      <NavDropdown.Item href="/profile_customer">Profile</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/log_out">Logout</NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <Image
                      src={user.avatar}
                      alt="immagine profilo"
                      roundedCircle
                      style={{ width: "80px", height: "80px", marginInline: "1rem", objectFit: "cover" }}
                    />
                    <NavDropdown
                      id="basic-nav-dropdown"
                      align="end">
                      <NavDropdown.Item href="/profile_owner">Profilo</NavDropdown.Item>
                      <NavDropdown.Item href="/profile_vehicle">Veicolo</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/log_out">Logout</NavDropdown.Item>
                    </NavDropdown>
                  </>
                )
              ) : (
                <></>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
