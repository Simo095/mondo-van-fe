import { Card, Col, Container, Nav, Row, Spinner } from "react-bootstrap";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SideBar from "../../componets/stucture/SideBar";

import FormAddPost from "./FormAddPost";
import ModaleCover from "./ModaleCover";
import MyPosts from "./MyPosts";
import { fetchMyPost } from "../../redux/actions";
import { fetchPrenotazioni } from "../../redux/actions/fetchActions";
import Prenotazione from "./Prenotazione";

const ProfileCustomer = () => {
  const user = useSelector(state => state.login.user);
  const token = useSelector(state => state.login.token);
  const postsOwner = useSelector(state => state.post.myPost);
  const [show, setShow] = useState(false);
  const [prenotazioni, setPrenotazioni] = useState(null);
  const [loadingPre, setLoadingPre] = useState(false);
  const dispatch = useDispatch();
  const [postText, setPostText] = useState();
  const [modifica, setModifica] = useState(false);
  const [idPost, setIdPost] = useState("");

  const [showPost, setShowPost] = useState(false);
  const handleClosePost = () => setShowPost(false);
  const handleShowPost = () => setShowPost(true);

  const delPost = async postId => {
    try {
      const resp = await fetch(`http://localhost:8080/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (resp.ok) {
        console.log("ciao");
        dispatch(fetchMyPost(token));
      }
    } catch (error) {
      console.log("si e' verificato un errore", error.message);
    }
  };

  useEffect(() => {
    dispatch(fetchPrenotazioni(token, setPrenotazioni, setLoadingPre));
  }, []);

  return (
    <Container fluid>
      <ModaleCover
        show={show}
        setShow={setShow}
      />
      {user ? (
        <Row className="row-cols-2">
          <Col
            xs={3}
            className="sidebarCircle d-flex text-white"
            style={{ maxWidth: "320px", backgroundColor: "#144658", borderColor: "#144658" }}>
            <SideBar />
          </Col>
          <Col className="flex-grow-1">
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
                      <div className="d-flex overflow-x-scroll oV gap-3">
                        {postsOwner.toReversed().map((elem, i) => (
                          <MyPosts
                            elem={elem}
                            key={`post${i}`}
                            cancella={delPost}
                            profile={user}
                            handleShow={handleShowPost}
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
export default ProfileCustomer;
