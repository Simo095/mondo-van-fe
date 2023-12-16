import { Card, CardFooter, Col, Container, Nav, Pagination, Row, Spinner } from "react-bootstrap";
import ModaleCover from "./ModaleCover";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SideBar from "../stucture/SideBar";
import ProfileVehicle from "../veicolo/ProfileVehicle";
import Prenotazione from "./Prenotazione";
import MyPosts from "./MyPosts";
import FormAddPost from "./FormAddPost";
import { BsCaretLeft, BsCaretRight } from "react-icons/bs";
import { fetchPrenotazioni } from "../../redux/actions/fetchActions";

const MyProfileOwner = () => {
  const user = useSelector(state => state.login.user);
  const postsOwner = useSelector(state => state.post.myPost);
  const [show, setShow] = useState(false);
  const [loadingPre, setLoadingPre] = useState(false);
  const [prenotazioni, setPrenotazioni] = useState(null);
  const [postText, setPostText] = useState();
  const [modifica, setModifica] = useState(false);
  const [idPost, setIdPost] = useState("");
  const [showPost, setShowPost] = useState(false);
  const handleClosePost = () => setShow(false);
  const handleShowPost = () => setShow(true);
  const delPost = async postId => {
    try {
      const resp = await fetch(``, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer "
        }
      });
      if (resp.ok) {
      }
    } catch (error) {
      console.log("si e' verificato un errore", error.message);
    }
  };
  useEffect(() => {}, []);

  return (
    <Container
      fluid
      className="MyProfileOwner d-flex flex-column flex-grow-1 flex-nowrap gap-5">
      <ModaleCover
        show={show}
        setShow={setShow}
      />
      {user ? (
        <Row>
          <Col
            xs={3}
            className="sidebarCircle d-flex text-white shadow-home"
            style={{ width: "320px", backgroundColor: "#144658", borderColor: "#144658" }}>
            <SideBar />
          </Col>
          <Col>
            <Row className="d-flex gap-4 flex-column">
              <Col
                sm={12}
                style={{ backgroundColor: "#144658", height: "60px" }}>
                <Nav>
                  <Nav.Item>
                    <Nav.Link>BlogPost</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link>Cerca un van</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
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
              <Col style={{ maxWidth: "800px" }}>
                <Container className="">
                  <h4>I tuoi post</h4>
                  <div className="d-flex justify-content-center">
                    <FormAddPost user={user} />
                  </div>
                  <Container
                    fluid
                    className="d-flex">
                    {postsOwner && postsOwner.length !== 0 && (
                      <div className="d-flex overflow-x-scroll gap-3">
                        {postsOwner.toReversed().map((elem, i) => (
                          // i >= page * 5 - 5 &&
                          // i < page * 5 && (
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
                        ))}
                      </div>
                    )}
                  </Container>
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
export default MyProfileOwner;
