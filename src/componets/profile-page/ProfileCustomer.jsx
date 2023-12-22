import { Button, Col, Container, Image, Nav, NavbarBrand, Offcanvas, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifiche, fetchPrenotazioni, fetchVehicleCustomerPage } from "../../redux/actions/fetchActions";
import SideBar from "../../componets/stucture/SideBar";
import FormAddPost from "../blog-post/FormAddPost";
import VanCustomerPage from "../results-page/VanCustomerPage";
import MyPosts from "../blog-post/MyPosts";
import Prenotazione from "./Prenotazione";
import ModaleAvatar from "./ModaleAvatar";
import Notifica from "./Notifica";
import { FaRegPenToSquare } from "react-icons/fa6";

const ProfileCustomer = () => {
  const user = useSelector(state => state.login.user);
  const token = useSelector(state => state.login.token);
  const postsOwner = useSelector(state => state.post.myPost);
  const vehicleSuggest = useSelector(state => state.result.vehicleCustomerProfile);
  const [prenotazioni, setPrenotazioni] = useState(null);
  const [loadingPre, setLoadingPre] = useState(false);
  const [show, setShow] = useState(false);
  const [notifiche, setNotifiche] = useState(null);
  const [showNotifiche, setShowNotifiche] = useState(false);
  const handleCloseNotifiche = () => setShowNotifiche(false);
  const handleShowNotifiche = () => {
    setShowNotifiche(true);
  };
  const dispatch = useDispatch();

  const placeHolder = [
    {
      id: 1,
      name: "PlaceHoleder",
      model: "PlaceHoleder",
      brand: "PlaceHoleder",
      desc: "Aimè non ci sono van nella tua regione",
      sits: 99,
      pricePerDay: 0,
      province: "Provincia",
      avatar: [
        "https://res.cloudinary.com/dhwybes2b/image/upload/v1702053853/qtx9eypbotnbyc9w84ko.jpg",
        "https://res.cloudinary.com/dhwybes2b/image/upload/v1702053853/qtx9eypbotnbyc9w84ko.jpg",
        "https://res.cloudinary.com/dhwybes2b/image/upload/v1702053853/qtx9eypbotnbyc9w84ko.jpg"
      ],
      listStatus: [
        { idServiceStatus: 4, date: "2000-01-01", state: "AVAILABLE" },
        { idServiceStatus: 4, date: "2000-01-01", state: "AVAILABLE" },
        { idServiceStatus: 4, date: "2000-01-01", state: "AVAILABLE" }
      ]
    },
    {
      id: 1,
      name: "PlaceHoleder",
      model: "PlaceHoleder",
      brand: "PlaceHoleder",
      desc: "Aimè non ci sono van nella tua regione",
      sits: 99,
      pricePerDay: 0,
      province: "Provincia",
      avatar: [
        "https://res.cloudinary.com/dhwybes2b/image/upload/v1702053853/qtx9eypbotnbyc9w84ko.jpg",
        "https://res.cloudinary.com/dhwybes2b/image/upload/v1702053853/qtx9eypbotnbyc9w84ko.jpg",
        "https://res.cloudinary.com/dhwybes2b/image/upload/v1702053853/qtx9eypbotnbyc9w84ko.jpg"
      ],
      listStatus: [
        { idServiceStatus: 4, date: "2000-01-01", state: "AVAILABLE" },
        { idServiceStatus: 4, date: "2000-01-01", state: "AVAILABLE" },
        { idServiceStatus: 4, date: "2000-01-01", state: "AVAILABLE" }
      ]
    },
    {
      id: 1,
      name: "PlaceHoleder",
      model: "PlaceHoleder",
      brand: "PlaceHoleder",
      desc: "Aimè non ci sono van nella tua regione",
      sits: 99,
      pricePerDay: 0,
      province: "Provincia",
      avatar: [
        "https://res.cloudinary.com/dhwybes2b/image/upload/v1702053853/qtx9eypbotnbyc9w84ko.jpg",
        "https://res.cloudinary.com/dhwybes2b/image/upload/v1702053853/qtx9eypbotnbyc9w84ko.jpg",
        "https://res.cloudinary.com/dhwybes2b/image/upload/v1702053853/qtx9eypbotnbyc9w84ko.jpg"
      ],
      listStatus: [
        { idServiceStatus: 4, date: "2000-01-01", state: "AVAILABLE" },
        { idServiceStatus: 4, date: "2000-01-01", state: "AVAILABLE" },
        { idServiceStatus: 4, date: "2000-01-01", state: "AVAILABLE" }
      ]
    }
  ];

  useEffect(() => {
    dispatch(fetchVehicleCustomerPage(token));
    dispatch(fetchPrenotazioni(token, setPrenotazioni, setLoadingPre));
    dispatch(fetchNotifiche(token, setNotifiche));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      fluid
      className="ContainerProfileMain">
      <ModaleAvatar
        show={show}
        setShow={setShow}
      />

      <Offcanvas
        show={showNotifiche}
        onHide={handleCloseNotifiche}
        placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Notifiche</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {notifiche &&
            notifiche.map(elem => (
              <Notifica
                elem={elem}
                key={elem.id}
                setNotifiche={setNotifiche}
              />
            ))}
        </Offcanvas.Body>
      </Offcanvas>

      {user ? (
        <Row className="row-cols-2">
          <Col className="sidebarCircle d-flex">
            <SideBar />
          </Col>
          <Col
            style={{ height: "115h" }}
            className="flex-grow-1 overflow-y-scroll oV">
            <Row className="d-flex flex-column">
              <Col
                sm={12}
                className="NavProfile">
                <Nav className="d-flex align-items-center mt-1">
                  <Nav.Item>
                    <Nav.Link
                      href="/blogpost"
                      className="text-decoration-none text-white">
                      BlogPost
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
                  <Nav.Item className="flex-grow-1 NavProfileLink">
                    {notifiche && (
                      <Button
                        onClick={notifiche && handleShowNotifiche}
                        className="text-white bg-transparent border-0 d-flex align-items-start justify-content-end"
                        style={{ fontWeight: "bold", fontFamily: "Rethink Sans, sans-serif" }}>
                        Notifiche
                      </Button>
                    )}
                  </Nav.Item>
                  <NavbarBrand className="NavProfileLink NavProfileLinkImg ">
                    <Button
                      href={
                        user.role === "OWNER" ? "/profile_owner" : user.role === "CUSTOMER" ? "profile_customer" : ""
                      }
                      className="NavProfileLink NavProfileLinkImg bg-transparent border-0 justify-content-end">
                      {" "}
                      <FaRegPenToSquare
                        className="m-0"
                        onClick={e => {
                          e.preventDefault();
                          setShow(true);
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
              <Col>
                <h3 className="text-white my-3">Bentornato, {user.name}. Ecco le tue prenotazioni</h3>
              </Col>
              <Col className="d-flex ContainerProfile ContainerProfileWhite py-4 justify-content-center">
                <Container className="d-flex flex-grow-1">
                  <Row className="d-flex flex-nowrap overflow-x-scroll oV">
                    {loadingPre ? (
                      <Col className="d-flex justify-content-center">
                        <Spinner variant="success" />
                      </Col>
                    ) : prenotazioni && prenotazioni.length !== 0 ? (
                      prenotazioni.map(pre => {
                        return (
                          <Col
                            sm={4}
                            key={pre.id}
                            className="">
                            <Prenotazione
                              pre={pre}
                              setPrenotazioni={setPrenotazioni}
                              setLoadingPre={setLoadingPre}
                            />
                          </Col>
                        );
                      })
                    ) : (
                      <Col className="d-flex justify-content-center">
                        <p>Non hai effettuato nessuna prenotazione</p>
                      </Col>
                    )}
                  </Row>
                </Container>
              </Col>
              <Col className="ContainerProfileMain  my-3">
                <h4 className="text-white">I tuoi post</h4>
              </Col>

              <Col className="ContainerProfileWhite ContainerProfile">
                <Container>
                  <div className="d-flex justify-content-center mt-3">
                    <FormAddPost user={user} />
                  </div>
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
              <Col className="ContainerProfileMain  my-3">
                <h4 className="text-white">Alcuni van nella tua regione</h4>
              </Col>
              <Col className="ContainerProfileWhite ContainerProfile">
                <Container
                  fluid
                  className="d-flex mt-4">
                  {vehicleSuggest && vehicleSuggest.length !== 0 ? (
                    <div className="d-flex overflow-x-scroll oV gap-3">
                      {vehicleSuggest.map((elem, i) => (
                        <VanCustomerPage elem={elem} />
                      ))}
                    </div>
                  ) : (
                    <div className="d-flex overflow-x-scroll oV gap-3">
                      {placeHolder.map((elem, i) => (
                        <VanCustomerPage elem={elem} />
                      ))}
                    </div>
                  )}
                </Container>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <></>
      )}
    </Container>
  );
};
export default ProfileCustomer;
