import { Col, Container, Nav, Row, Spinner } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SideBar from "../stucture/SideBar";
import ProfileVehicle from "../veicolo/ProfileVehicle";
import Prenotazione from "./Prenotazione";

import FormAddPost from "../blog-post/FormAddPost";

import { fetchPrenotazioniOwner } from "../../redux/actions/fetchActions";
import MyPosts from "../blog-post/MyPosts";

const ProfileOwner = () => {
  const user = useSelector(state => state.login.user);
  const postsOwner = useSelector(state => state.post.myPost);
  const token = useSelector(state => state.login.token);
  const dispatch = useDispatch();

  const [loadingPre, setLoadingPre] = useState(false);
  const [prenotazioni, setPrenotazioni] = useState(null);

  useEffect(() => {
    dispatch(fetchPrenotazioniOwner(token, setPrenotazioni, setLoadingPre));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      fluid
      className="ContainerProfileMain">
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
              <Col>
                <h3 className="text-white my-3">Prenotazioni</h3>
              </Col>
              <Col className="d-flex ContainerProfile py-4 justify-content-center">
                <Container className="d-flex justify-content-center flex-grow-1">
                  <Row className="d-flex flex-nowrap overflow-x-scroll">
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
                        <p className="mb-5 pb-5">Nessuna post da mostrare... Crea il tuo primo post!</p>
                      </Col>
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
export default ProfileOwner;
