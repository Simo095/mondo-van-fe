import { Col, Container, Row } from "react-bootstrap";
import sfondoHome from "../../assets/img/VW-Giallo.jpg";
import NavBar from "../../componets/stucture/NavBar";
import Footer from "../../componets/stucture/Footer";
import FormHome from "./FormHome";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { fetchPostHome, fetchPostHomeEmiliaRomagna } from "../../redux/actions";
import SinglePostHome from "../blog-post/SinglePostHome";
import SinglePostEm from "../blog-post/SinglePostEm";

const Home = () => {
  const posts = useSelector(state => state.post.home);
  const postsEm = useSelector(state => state.post.em);

  const dispatch = useDispatch();
  const [page, setPage] = useState();

  useEffect(() => {
    dispatch(fetchPostHome());
    dispatch(fetchPostHomeEmiliaRomagna());
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Home">
      <Row className="row-cols-1 justify-content-center">
        <Col
          style={{
            backgroundImage: `url(${sfondoHome})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            height: "100vh"
          }}>
          <NavBar />
          <Row className="mt-5">
            <Col className="d-flex flex-column justify-content-center align-items-center">
              <Row style={{ height: "20vh" }}>
                <Col>
                  <FormHome />
                </Col>
              </Row>
              <Container
                fluid
                className="d-flex flex-column align-items-center position-relative">
                <p
                  className="text-white shadow-p"
                  style={{ fontWeight: "bolder", backgroundColor: "#00000050" }}>
                  NOLEGGIA UN VAN PER LA TUA PROSSIMA VACANZA, E VIVI UN AVVENTURA INDIMENTICABILE!
                </p>
              </Container>
            </Col>
          </Row>
        </Col>

        <Col
          sm={4}
          style={{ width: "100vw" }}
          className="">
          <Row className="row-cols-1 mt-5 ">
            <Col className="ContainerTitle">
              <h3>Alcuni post dei nostri Van Travelrs</h3>
            </Col>
            <Col className="d-flex gap-3 overflow-y-scroll oV">
              {posts ? (
                posts.toReversed().map(
                  (elem, i) =>
                    i >= page * 5 - 5 &&
                    i < page * 5 && (
                      <SinglePostHome
                        elem={elem}
                        key={`post${i}`}
                      />
                    )
                )
              ) : (
                <></>
              )}
            </Col>
            <Col className="ContainerTitle">
              <h3>Qualche idea per un itinerario in Emilia Romagna</h3>
            </Col>
            <Col className="d-flex gap-3 overflow-y-scroll oV">
              {postsEm ? (
                postsEm.toReversed().map(
                  (elem, i) =>
                    i >= page * 5 - 5 &&
                    i < page * 5 && (
                      <SinglePostEm
                        elem={elem}
                        key={`post${i}`}
                      />
                    )
                )
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      <Footer />
    </div>
  );
};
export default Home;
