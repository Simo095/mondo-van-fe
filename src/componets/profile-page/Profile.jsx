import { useSelector } from "react-redux";
import { useEffect } from "react";

import { Button, Col, Container, Image, Nav, NavbarBrand, Row } from "react-bootstrap";
import SideBar from "../stucture/SideBar";

import "../../assets/style/drop-zone-card.css";

import { FaRegPenToSquare } from "react-icons/fa6";
import MyPosts from "../blog-post/MyPosts";
import VehicleProfile from "../veicolo/VehicleProfile";

const Profile = () => {
  const user = useSelector(state => state.login.user);
  const token = useSelector(state => state.login.token);
  const vehicle = useSelector(state => state.post.visitVehicle);
  const userVisit = useSelector(state => state.post.visitUser);
  const postsOwner = useSelector(state => state.post.postUserVisit);
  const postProfileUser = () => {};

  useEffect(() => {
    postProfileUser();
  }, []);
  return (
    <div className="Profile">
      {userVisit && (
        <Row className="row-cols-2">
          <Col className="sidebarCircle d-flex">
            <SideBar />
          </Col>
          <Col
            style={{ height: "115h" }}
            className="flex-grow-1 overflow-y-scroll oV">
            <Row className="d-flex ContainerProfileMain pe-3 flex-column">
              <Col
                sm={12}
                className="NavProfile">
                <Nav className="d-flex align-items-center mt-1">
                  <Nav.Item>
                    <Nav.Link
                      href="/blogpost"
                      className="text-decoration-none text-white">
                      I racconti della Comunity
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      href="/"
                      className="text-decoration-none text-white">
                      Cerca un van
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="NavProfileLink">
                    <Nav.Link
                      href="/"
                      className="text-decoration-none text-white ">
                      Account
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="flex-grow-1 NavProfileLink"></Nav.Item>
                  <NavbarBrand className="NavProfileLink NavProfileLinkImg ">
                    <Button
                      // href={user.role === "OWNER" ? "/profile_owner" : user.role === "CUSTOMER" ? "profile_customer" : ""}
                      className="NavProfileLink NavProfileLinkImg bg-transparent border-0 justify-content-end">
                      <FaRegPenToSquare
                        className="m-0"
                        onClick={e => {
                          // e.preventDefault();
                          // setShow(true);
                        }}
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          fontSize: "1em",
                          color: "black"
                        }}
                      />
                      <Image
                        src={user.avatar}
                        rounded
                        width={50}
                        height={50}
                        style={{ objectFit: "cover" }}
                      />
                    </Button>
                  </NavbarBrand>
                </Nav>
              </Col>
              <h3 className="text-white my-3">Profilo di {userVisit.name}</h3>
              <Col className=" ContainerProfile p-0">
                <Image
                  className="w-100"
                  src={userVisit.cover}
                  height={350}
                  style={{ objectFit: "cover" }}
                  rounded
                />
              </Col>

              {vehicle && (
                <>
                  <Col className="ContainerProfileMain my-3">
                    <h4 className="text-white">Veicolo di {userVisit.name}</h4>
                  </Col>
                  <Col className="p-3 ContainerProfile">
                    <VehicleProfile
                      vehicle={vehicle}
                      token={token}
                    />
                  </Col>
                </>
              )}
              <Col className="ContainerProfileMain my-3">
                <h4 className="text-white">Racconti di {userVisit.name}</h4>
              </Col>

              <Col className="ContainerProfileWhite ContainerProfile">
                <Container>
                  <Container
                    fluid
                    className="d-flex">
                    {postsOwner && postsOwner.length !== 0 ? (
                      <div className="d-flex overflow-x-scroll oV gap-3">
                        {postsOwner.toReversed().map((elem, i) => (
                          <MyPosts
                            elem={elem}
                            key={`post${i}`}
                            token={token}
                            profile={user}
                          />
                        ))}
                      </div>
                    ) : (
                      <Col className="d-flex justify-content-center">
                        <p>Nessuna post da mostrare... Crea il tuo primo post!</p>
                      </Col>
                    )}
                  </Container>
                </Container>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
};
export default Profile;
