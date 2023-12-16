import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchDisponibilita, fetchNotifiche, fetchPrenotazioni, fetchVehicle } from "../../redux/actions/fetchActions";
import { fetchMyPost, fetchMyPostFriends, fetchPost } from "../../redux/actions";

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Nav,
  Pagination,
  Row,
  Spinner
} from "react-bootstrap";
import SideBar from "../../componets/stucture/SideBar";
import Notifiche from "./Notifiche";
import Calendario from "../../componets/stucture/Calendario";
import Dropzone from "react-dropzone";
import SinglePost from "./SinglePost";
import Prenotazione from "./Prenotazione";
import AllPost from "../blog-post/AllPost";
import MyPosts from "./MyPosts";
import "../../assets/style/drop-zone-card.css";
import ModaleCover from "./ModaleCover";
import NavBar from "../stucture/NavBar";
import MyFriendsPost from "./MyFriendsPost";
import ProfileVehicle from "../veicolo/ProfileVehicle";

import { FaRegPenToSquare } from "react-icons/fa6";
import { FaFileUpload } from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { RiArrowGoBackLine, RiSendPlaneFill } from "react-icons/ri";
import { BsCaretLeft, BsCaretRight } from "react-icons/bs";
import cover from "../../assets/user_placeholder.png";

const ProfileOwner = () => {
  const user = useSelector(state => state.login.user);
  const token = useSelector(state => state.login.token);
  const postsOwner = useSelector(state => state.post.myPost);
  const postsFriends = useSelector(state => state.post.postMyFriends);
  const [disponibilita, setDisponibilita] = useState(null);
  const [idDispo, setIdDispo] = useState(null);
  const [show, setShow] = useState(false);
  const [loadingPre, setLoadingPre] = useState(false);
  const [calendario, setCalendario] = useState(true);
  const [altro, setAltro] = useState(false);
  const [notifiche, setNotifiche] = useState([]);
  const [prenotazioni, setPrenotazioni] = useState(null);
  const [blog, setBlog] = useState(false);

  const [postText, setPostText] = useState();
  const [modifica, setModifica] = useState(false);
  const [idPost, setIdPost] = useState("");
  const [page, setPage] = useState();
  const [showPost, setShowPost] = useState(false);
  const handleClosePost = () => setShow(false);
  const handleShowPost = () => setShow(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modifyCover = () => setShow(true);

  const delPost = async postId => {
    try {
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
    dispatch(fetchVehicle(token, navigate));
    dispatch(fetchDisponibilita(token, setDisponibilita, setIdDispo));
    dispatch(fetchNotifiche(token, setNotifiche));
    dispatch(fetchPrenotazioni(token, setPrenotazioni, setLoadingPre));
    dispatch(fetchMyPost(token));
    dispatch(fetchMyPostFriends(token));
    setPage(1);
  }, []);
  return (
    <div className="ProfileOwner">
      <NavBar />
      <Container
        fluid
        className="d-flex flex-column flex-nowrap gap-5">
        <ModaleCover
          show={show}
          setShow={setShow}
        />
        {user ? (
          <Row className="">
            <Col
              className="sidebarCircle text-white "
              style={{ width: "320px", backgroundColor: "#144658", borderColor: "#144658" }}
              sm={3}>
              <SideBar />

              {/* <Row className="d-flex flex-column mt-3">
                <Nav
                  variant="tabs"
                  defaultActiveKey="#first"
                  className="d-flex ms-3 border-0">
                  <Nav.Item className="navCalendar">
                    <Nav.Link
                      className=" text-white "
                      onClick={() => {
                        setCalendario(true);
                        setAltro(false);
                        setBlog(false);
                      }}>
                      Calendario
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="navCalendar">
                    <Nav.Link
                      className=" text-white "
                      onClick={() => {
                        setCalendario(false);
                        setAltro(true);
                        setBlog(false);
                      }}>
                      Notifiche
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="navCalendar">
                    <Nav.Link
                      className=" text-white "
                      onClick={() => {
                        setCalendario(false);
                        setBlog(true);
                        setAltro(false);
                      }}>
                      Post
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <Col className="text-white ">
                  {disponibilita
                    ? calendario && (
                        <div className="d-flex flex-column justify-content-start">
                          <h2>Le tue disponibilita</h2>
                           <Calendario
                            array={disponibilita}
                            idDispo={idDispo}
                          /> 
                        </div>
                      )
                    : calendario && (
                        <>
                          <h4>Registra un mezzo per utilizzare questa funzionalità </h4>
                        </>
                      )} 
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
                  {blog ? (
                    <Card className="">
                      <CardHeader>
                        <CardTitle>Post</CardTitle>
                      </CardHeader>
                      <Card.Body>
                        <Row
                          className="d-flex row-cols-1 oV overflow-y-scroll"
                          style={{ height: "30vh" }}></Row>
                      </Card.Body>
                    </Card>
                  ) : (
                    <></>
                  )}
                </Col>
              </Row> */}
            </Col>
            <Col className="">
              <Row className="d-flex gap-4 flex-column ms-2 mt-5">
                {/* <Col
                  className="d-flex justify-content-end"
                  style={{
                    backgroundImage: `url(${user.cover})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",

                    minHeight: "40vh",
                    maxWidth: "800px"
                  }}>
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
                </Col> */}
                <Col style={{ maxWidth: "800px" }}>
                  <ProfileVehicle />
                </Col>
                <Col
                  className="d-flex  justify-content-center"
                  style={{ maxWidth: "800px" }}>
                  <Card className="d-flex flex-grow-1">
                    <Card.Header style={{ backgroundColor: "#144658", borderColor: "#144658", color: "white" }}>
                      Prenotazioni
                    </Card.Header>
                    <Row className="d-flex flex-grow-1">
                      {loadingPre ? (
                        <Col className="d-flex justify-content-center">
                          <Spinner variant="success" />
                        </Col>
                      ) : prenotazioni && prenotazioni.length !== 0 ? (
                        prenotazioni.map(pre => {
                          return (
                            <Col
                              key={pre.id}
                              className="d-flex">
                              <Prenotazione pre={pre} />
                            </Col>
                          );
                        })
                      ) : (
                        <Col className="d-flex justify-content-center">
                          <p>Nessuna prenotazione da parte dei Van Travelers</p>
                        </Col>
                      )}
                    </Row>
                  </Card>
                </Col>

                <Col
                  style={{ maxWidth: "800px" }}
                  className="d-flex flex-column overflow-y-scroll">
                  <Card className="">
                    <Card.Header>I tuoi post</Card.Header>
                    <Row className="d-flex flex-grow-1">
                      {postsOwner && postsOwner.length !== 0 ? (
                        <Col className="d-flex justify-content-center">
                          {postsOwner.toReversed().map(
                            (elem, i) =>
                              i >= page * 5 - 5 &&
                              i < page * 5 && (
                                <MyPosts
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
                          )}
                        </Col>
                      ) : (
                        <Row>
                          <Col className="d-flex justify-content-center">
                            <p>Nessun post...</p>
                          </Col>
                        </Row>
                      )}
                      <CardFooter>
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
                            <Pagination.Item disabled>
                              {page === postsOwner.length / 5 ? "..." : page + 1}
                            </Pagination.Item>
                            <Pagination.Item
                              onClick={() => {
                                console.log(postsOwner.length);
                                page < postsOwner.length / 5 && setPage(page + 1);
                              }}>
                              <BsCaretRight />
                            </Pagination.Item>
                          </Pagination>
                        </div>
                      </CardFooter>
                    </Row>
                  </Card>
                </Col>
                <Col
                  style={{ maxWidth: "800px" }}
                  className="d-flex flex-column overflow-y-scroll">
                  <Card className="">
                    <Card.Header>I post dei tuoi amici</Card.Header>
                    <Row className="d-flex flex-grow-1">
                      {postsFriends && postsFriends.length !== 0 ? (
                        <Col className="d-flex justify-content-center">
                          {postsFriends.toReversed().map(
                            (elem, i) =>
                              i >= page * 1 - 1 &&
                              i < page * 1 && (
                                <MyFriendsPost
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
                          )}
                        </Col>
                      ) : (
                        <Row>
                          <Col className="d-flex justify-content-center">
                            <p>Nessun post...</p>
                          </Col>
                        </Row>
                      )}
                      <CardFooter>
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
                            <Pagination.Item disabled>
                              {page === postsFriends.length / 1 ? "..." : page + 1}
                            </Pagination.Item>
                            <Pagination.Item
                              onClick={() => {
                                console.log(postsFriends.length);
                                page < postsFriends.length / 1 && setPage(page + 1);
                              }}>
                              <BsCaretRight />
                            </Pagination.Item>
                          </Pagination>
                        </div>
                      </CardFooter>
                    </Row>
                  </Card>
                </Col>

                {/* <Col>
                      {date && calendario ? (
                        <div className="mediaQueryCalendario mx-5">
                          <h2>Le disponibilita per gli utenti</h2>
                          <Calendario
                            array={date}
                            idDispo={idDispo}
                          />
                        </div>
                      ) : (
                        <div className="mediaQueryCalendario">
                          <h4>Registra un mezzo per utilizzare questa funzionalità </h4>
                        </div>
                      )}
                    </Col> */}
              </Row>
            </Col>
          </Row>
        ) : (
          <></>
        )}
      </Container>
    </div>
  );
};
export default ProfileOwner;
