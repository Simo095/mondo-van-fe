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
              href="/register_user">
              Sign in
            </Nav.Link>
            <Nav.Link
              className="text-white"
              href="/login">
              Login
            </Nav.Link>
          </Nav>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex justify-content-center flex-grow-1">
              <Nav.Link
                className="color-link-nav"
                href="/register_user">
                PRENOTA UN VAN
              </Nav.Link>
              <Nav.Link
                className="color-link-nav"
                href="/register_van">
                ISCRIVI IL TUO VAN
              </Nav.Link>
              <Nav.Link
                className="color-link-nav"
                href="/rules">
                COME FUNZIONA?
              </Nav.Link>
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
                <div className="d-flex gap-5 btn-nav">
                  <Nav.Link
                    className="text-white"
                    href="/register_user">
                    Sign in
                  </Nav.Link>
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
