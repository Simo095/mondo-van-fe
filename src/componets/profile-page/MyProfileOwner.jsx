import { Card, CardFooter, Col, Container, Nav, Pagination, Row, Spinner } from "react-bootstrap";
import ModaleCover from "./ModaleCover";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SideBar from "../stucture/SideBar";
import ProfileVehicle from "../veicolo/ProfileVehicle";
import Prenotazione from "./Prenotazione";
import MyPosts from "./MyPosts";
import FormAddPost from "./FormAddPost";
import { BsCaretLeft, BsCaretRight } from "react-icons/bs";
import { fetchPrenotazioni } from "../../redux/actions/fetchActions";
import { fetchMyPost } from "../../redux/actions";

const MyProfileOwner = () => {
  const user = useSelector(state => state.login.user);
  const postsOwner = useSelector(state => state.post.myPost);
  const token = useSelector(state => state.login.token);
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(fetchPrenotazioni(token, setPrenotazioni, setLoadingPre));
  }, []);

  return (
    <Container
      fluid
      className="ContainerProfileMain">
      <ModaleCover
        show={show}
        setShow={setShow}
      />
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
                <Nav>
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
                </Nav>
              </Col>
              <Col className="ContainerProfile pt-4">
                <ProfileVehicle />
              </Col>
              <Col className="d-flex ContainerProfileWhite py-4  justify-content-center">
                <Card className="d-flex justify-content-center flex-grow-1">
                  <Card.Header style={{ backgroundColor: "#144658", borderColor: "#144658", color: "white" }}>
                    Prenotazioni
                  </Card.Header>
                  <Row className="">
                    {loadingPre ? (
                      <Col className="d-flex justify-content-center">
                        <Spinner variant="success" />
                      </Col>
                    ) : prenotazioni && prenotazioni.length !== 0 ? (
                      prenotazioni.map(pre => {
                        return (
                          <Col
                            sm={3}
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
                        <p>Nessuna prenotazione da parte dei Van Travelers</p>
                      </Col>
                    )}
                  </Row>
                </Card>
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
                    {postsOwner && postsOwner.length !== 0 && (
                      <div className="d-flex overflow-x-scroll oV gap-3">
                        {postsOwner.toReversed().map((elem, i) => (
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
