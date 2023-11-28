import { Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
const NavBar = () => {
  const user = useSelector(state => state.login.user);
  const role = useSelector(state => state.login.role);
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
            {/* <Image
            src={logo}
            width={250}
          /> */}
            VAN WORLD
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="nav-toggler"
          />
          <Nav className="d-flex flex-row gap-5 btn-nav-none">
            <Nav.Link
              className="text-white"
              href="/login">
              Login
            </Nav.Link>
          </Nav>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex justify-content-center flex-grow-1">
              {user ? (
                <></>
              ) : (
                <>
                  <Nav.Link
                    className="color-link-nav"
                    href="/register_customer">
                    PRENOTA UN VAN
                  </Nav.Link>
                  <Nav.Link
                    className="color-link-nav"
                    href="/register_owner">
                    ISCRIVI IL TUO VAN
                  </Nav.Link>
                  <Nav.Link
                    className="color-link-nav"
                    href="/rules">
                    COME FUNZIONA?
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Nav>
              {user ? (
                role === "CUSTOMER" ? (
                  <>
                    <Image
                      src={user.avatar}
                      alt="image profile"
                      roundedCircle
                      style={{ width: "60px", height: "60px", marginInline: "1rem" }}
                    />
                    <NavDropdown id="basic-nav-dropdown">
                      <NavDropdown.Item href="/profile_customer">Profile</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">Setting</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">Others</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/log_out">Logout</NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <Image
                      src={user.avatar}
                      alt="image profile"
                      roundedCircle
                      style={{ width: "60px", height: "60px", marginInline: "1rem" }}
                    />
                    <NavDropdown id="basic-nav-dropdown">
                      <NavDropdown.Item href="/profile_owner">Profile</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">Setting</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">Others</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/log_out">Logout</NavDropdown.Item>
                    </NavDropdown>
                  </>
                )
              ) : (
                <div className="d-flex gap-5 btn-nav">
                  <Nav.Link
                    className="text-white"
                    href="/login">
                    Login
                  </Nav.Link>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
