import { Image, NavItem } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from "../../assets/LogoVanWorld.png";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsSignpost2 } from "react-icons/bs";
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
                <Container className="d-flex justify-content-center">
                  <div className="d-flex flex-column align-items-center justify-content-end">
                    <BsSignpost2
                      fontSize={30}
                      href="/blogpost"
                    />
                    <Link
                      className="color-link-nav text-decoration-none"
                      to="/blogpost">
                      BlogPost
                    </Link>
                  </div>
                  <Link
                    className="color-link-nav"
                    to="/profile_customer">
                    <Image
                      src={user.avatar}
                      alt="immagine profilo"
                      roundedCircle
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover"
                      }}
                    />
                  </Link>
                </Container>
              ) : (
                <Container className="d-flex justify-content-center">
                  <div className="d-flex flex-column align-items-center justify-content-end">
                    <BsSignpost2
                      fontSize={30}
                      href="/blogpost"
                    />
                    <Link
                      className="color-link-nav text-white text-decoration-none"
                      to="/blogpost">
                      BlogPost
                    </Link>
                  </div>
                  <Link
                    className="color-link-nav"
                    to="/profile_owner">
                    <Image
                      src={user.avatar}
                      alt="immagine profilo"
                      roundedCircle
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover"
                      }}
                    />
                  </Link>
                </Container>
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
