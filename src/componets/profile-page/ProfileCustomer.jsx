import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Nav,
  Pagination,
  Row,
  Spinner
} from "react-bootstrap";
import { FaRegPenToSquare } from "react-icons/fa6";

import cover from "../../assets/user_placeholder.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import Dropzone from "react-dropzone";
import { RiArrowGoBackLine, RiSendPlaneFill } from "react-icons/ri";
import SideBar from "../../componets/stucture/SideBar";
import Notifiche from "./Notifiche";
import { fetchUser } from "../../redux/actions/fetchActions";
import { BsCaretLeft, BsCaretRight } from "react-icons/bs";
import SinglePost from "./SinglePost";
import { fetchPost } from "../../redux/actions";

const ProfileCustomer = () => {
  const user = useSelector(state => state.login.user);
  const token = useSelector(state => state.login.token);
  const posts = useSelector(state => state.post.data);
  const [show, setShow] = useState(false);
  const [coverImg, setCover] = useState(null);
  const [loading, setLoading] = useState(false);
  const [altro, setAltro] = useState(true);
  const [notifiche, setNotifiche] = useState([]);
  const [open, setOpen] = useState(false);
  const [prenotazioni, setPrenotazioni] = useState(null);
  const [loadingPre, setLoadingPre] = useState(false);
  const [postText, setPostText] = useState();
  const [modifica, setModifica] = useState(false);
  const [idPost, setIdPost] = useState("");
  const [page, setPage] = useState();
  const [showPost, setShowPost] = useState(false);
  const handleClosePost = () => setShow(false);
  const handleShowPost = () => setShow(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const modifyCover = () => setShow(true);

  const handlerSubmitCover = async e => {
    e.preventDefault();
    const formCover = new FormData();
    formCover.append("cover", coverImg[0]);
    setLoading(true);
    if (cover) {
      const coverfetch = await fetch("http://localhost:8080/users/upload_cover", {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token
        },
        body: formCover
      });
      if (coverfetch.ok) {
        await dispatch(fetchUser(token));
        setLoading(false);
      }
    }
    handleClose();
  };

  const fetchNotifiche = async () => {
    const risp = await fetch("http://localhost:8080/notifications", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    });
    if (risp.ok) {
      const notifiche = await risp.json();
      setNotifiche(notifiche);
    }
  };
  const fetchPrenotazioni = async () => {
    setLoadingPre(true);
    const risp = await fetch("http://localhost:8080/reservations/my_reservations", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    });
    if (risp.ok) {
      const pre = await risp.json();
      setPrenotazioni(pre.content);
      if (pre) {
        setLoadingPre(false);
      }
    }
  };
  const delPost = async postId => {
    try {
      console.log("cancella");

      const resp = await fetch(``, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (resp.ok) {
      }
    } catch (error) {
      console.log("si e' verificato un errore", error.message);
    }
  };

  useEffect(() => {
    fetchNotifiche();
    fetchPrenotazioni();
    dispatch(fetchPost(token));
    setPage(1);
  }, []);

  return (
    <div className="ProfileCustomer">
      <Container
        fluid
        className="d-flex flex-column flex-nowrap gap-5">
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>Immagine di copertina</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              id="drop"
              className="d-flex justify-content-center "
              onSubmit={handlerSubmitCover}>
              <Dropzone
                onDrop={acceptedFiles => {
                  setCover(acceptedFiles);
                }}>
                {({ getRootProps, getInputProps, acceptedFiles }) => (
                  <>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div
                        style={{
                          border: "3px",
                          borderStyle: "dashed",
                          borderRadius: "30px",
                          borderColor: "ActiveBorder"
                        }}
                        className="text-center">
                        {acceptedFiles[0]
                          ? acceptedFiles[0].path
                          : "Tracina l'immagine che desideri come cover \noppure clicca sul qui per aprire explore e selezionarla"}
                      </div>
                      {loading ? (
                        <Spinner
                          animation="border"
                          className="mt-5"
                          variant="success"
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                )}
              </Dropzone>
            </Form>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <RiArrowGoBackLine
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
            <Button
              style={{ background: "white", border: "white" }}
              type="submit"
              form="drop">
              <RiSendPlaneFill style={{ cursor: "pointer", color: "black" }} />
            </Button>
          </Modal.Footer>
        </Modal>

        {user ? (
          <>
            <Row className="d-flex flex-nowrap mt-5">
              <Col
                className="sidebarCircle"
                style={{ width: "338px" }}
                sm={3}>
                <SideBar />
                <Row className="d-flex flex-column mt-3">
                  <Nav
                    variant="tabs"
                    defaultActiveKey="#first"
                    className="d-flex ms-3  border-0">
                    <Nav.Item className="navCalendar">
                      <Nav.Link
                        onClick={() => {
                          setAltro(false);
                        }}>
                        Altro
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="navCalendar">
                      <Nav.Link
                        onClick={() => {
                          setAltro(true);
                        }}>
                        Notifiche
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Col>
                    {altro ? (
                      <Card className="">
                        <CardHeader>
                          <CardTitle>Notifiche</CardTitle>
                        </CardHeader>
                        <Card.Body>
                          <Row
                            className="d-flex row-cols-1 oV overflow-y-scroll"
                            style={{ height: "30vh" }}>
                            {notifiche &&
                              notifiche.map((elem, i) => (
                                <Notifiche
                                  notifica={elem}
                                  key={i}
                                  i={i}
                                  setNotifiche={setNotifiche}
                                />
                              ))}
                          </Row>
                        </Card.Body>
                      </Card>
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col
                style={{ height: "100vh" }}
                className="d-flex oV overflow-y-scroll">
                <Row className="d-flex ms-2 mt-5 flex-grow-1">
                  <Col
                    className="d-flex justify-content-end"
                    style={{
                      backgroundImage: `url(${user.cover})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "30px",
                      height: "50vh"
                    }}>
                    {" "}
                    <div
                      className="d-flex align-items-start justify-content-center"
                      style={{
                        backgroundColor: "black",
                        opacity: "0.3",
                        borderRadius: "30px",
                        height: "40px",
                        width: "40px"
                      }}>
                      <FaRegPenToSquare
                        className="mt-2"
                        onClick={modifyCover}
                        style={{
                          cursor: "pointer",
                          opacity: "0.5",
                          fontSize: "1.5em",
                          color: "white"
                        }}
                      />
                    </div>
                  </Col>
                  <Row className="mt-5 d-flex justify-content-center no-wrap gap-3 row-cols-1 ">
                    <Col className="d-flex justify-content-center">
                      <Card className="d-flex flex-grow-1">
                        <Card.Header>Prenotazioni</Card.Header>
                        <Row className="d-flex flex-grow-1">
                          <Card.Body className="d-flex">
                            {loadingPre ? (
                              <Spinner variant="danger" />
                            ) : (
                              prenotazioni &&
                              prenotazioni.map(pre => {
                                console.log(pre);
                                return (
                                  <Col
                                    sm={3}
                                    key={pre.id}
                                    className="d-flex">
                                    <Card>
                                      <Card.Img
                                        variant="top"
                                        src={pre.vehicle.avatar[0]}
                                      />
                                      <Card.Body className="d-flex flex-column justify-content-end">
                                        <Card.Title>
                                          Dal {pre.startDate.substring(5, 11).split("-").reverse().join("-")} al{" "}
                                          {pre.endDate.substring(5, 11).split("-").reverse().join("-")}
                                        </Card.Title>
                                        <Card.Text>Van: {pre.vehicle.name}</Card.Text>
                                        <Card.Text>
                                          Stato:{" "}
                                          {pre.state === "TAKING_CHARGE"
                                            ? "IN ATTESA DI CONFERMA DAL PROPRIETARIO"
                                            : pre.state === "PENDING_PAYMENT"
                                            ? "IN ATTESA DEL PAGAMENTO"
                                            : pre.state === "CONFIRMED"
                                            ? "CONFERMATA"
                                            : pre.state === "NOT_CONFIRMED"
                                            ? "NON CONFERMATA"
                                            : ""}
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                                  </Col>
                                );
                              })
                            )}
                          </Card.Body>
                        </Row>
                      </Card>
                    </Col>
                    <Col className="d-flex flex-column overflow-y-scroll justify-content-center">
                      <Container>
                        {posts ? (
                          <>
                            {posts
                              .filter(elem => elem.author.id === user.id)
                              .toReversed()
                              .map((elem, i) => (
                                <SinglePost
                                  elem={elem}
                                  key={`post${i}`}
                                  cancella={delPost}
                                  profile={user}
                                  handleClose={handleClosePost}
                                  handleShow={handleShowPost}
                                  show={showPost}
                                  setPostText={setPostText}
                                  setModifica={setModifica}
                                  setIdPost={setIdPost}
                                />
                              ))}
                            <hr />
                            {/* {posts.toReversed().map(
                              (elem, i) =>
                                i >= page * 5 - 5 &&
                                i < page * 5 && (
                                  <SinglePost
                                    elem={elem}
                                    key={`post${i}`}
                                    cancella={delPost}
                                    profile={user}
                                    handleClose={handleClosePost}
                                    handleShow={handleShowPost}
                                    show={showPost}
                                    setPostText={setPostText}
                                    setModifica={setModifica}
                                    setIdPost={setIdPost}
                                  />
                                )
                            )} */}
                          </>
                        ) : (
                          <></>
                        )}
                      </Container>
                    </Col>
                    <div className="d-flex justify-content-center">
                      <Pagination className="d-flex justify-content-center">
                        <Pagination.Item
                          onClick={() => {
                            page > 1 && setPage(page - 1);
                          }}>
                          <BsCaretLeft />
                        </Pagination.Item>
                        <Pagination.Item disabled>{page - 1 === 0 ? "..." : page - 1}</Pagination.Item>
                        <Pagination.Item active={true}>{page}</Pagination.Item>
                        <Pagination.Item disabled>{page === posts.length / 5 ? "..." : page + 1}</Pagination.Item>
                        <Pagination.Item
                          onClick={() => {
                            console.log(posts.length);
                            page < posts.length / 5 && setPage(page + 1);
                          }}>
                          <BsCaretRight />
                        </Pagination.Item>
                      </Pagination>
                    </div>
                  </Row>
                </Row>
              </Col>
            </Row>
          </>
        ) : (
          <></>
        )}
      </Container>
    </div>
  );
};
export default ProfileCustomer;
