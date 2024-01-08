import { Image, NavItem } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from "../../assets/img/LogoVanWorld.png";
import Navbar from "react-bootstrap/Navbar";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavBar = () => {
  const user = useSelector(state => state.login.user);
  return (
    <Navbar
      expand="lg"
      className="NavBar">
      <Container>
        <Navbar.Brand
          href="/"
          className="logo">
          <Image
            src={logo}
            width={60}
          />
          VAN WORLD
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="nav-toggler mb-2"
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
                  className="color-link-nav"
                  href="/login">
                  LOGIN
                </Nav.Link>
              </>
            )}
          </Nav>

          <Nav>
            {user ? (
              user.role === "CUSTOMER" ? (
                <div className="d-flex align-items-center">
                  <NavItem>
                    <Nav.Link
                      className="color-link-nav"
                      href="/blogpost">
                      I racconti della Comunity
                    </Nav.Link>
                  </NavItem>
                  <Container className="d-flex justify-content-center">
                    <Link
                      className="color-link-nav"
                      to="/profile_customer">
                      <Image
                        src={user.avatar}
                        alt="immagine profilo"
                        className="mt-2"
                        roundedCircle
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover"
                        }}
                      />
                    </Link>
                  </Container>
                </div>
              ) : (
                <div className="d-flex align-items-center">
                  <NavItem>
                    <Nav.Link
                      className="color-link-nav"
                      href="/blogpost">
                      I racconti della Comunity
                    </Nav.Link>
                  </NavItem>
                  <Container className="d-flex justify-content-center">
                    <Link
                      className="color-link-nav"
                      to="/profile_owner">
                      <Image
                        src={user.avatar}
                        alt="immagine profilo"
                        className="mt-2"
                        roundedCircle
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover"
                        }}
                      />
                    </Link>
                  </Container>
                </div>
              )
            ) : (
              <></>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
