import { Col, Container, Pagination, Row } from "react-bootstrap";
import sfondoHome from "../../assets/VW-Giallo.jpg";
import NavBar from "../../componets/stucture/NavBar";
import Footer from "../../componets/stucture/Footer";
import FormHome from "./FormHome";
import { useDispatch, useSelector } from "react-redux";
import SinglePost from "../profile-page/SinglePost";
import { useEffect, useState } from "react";
import { fetchPostHome, fetchPostHomeEmiliaRomagna } from "../../redux/actions";
import { BsCaretLeft, BsCaretRight } from "react-icons/bs";
import SinglePostHome from "./SinglePostHome";
import SinglePostEm from "./SinglePostEm";

const Home = () => {
  const posts = useSelector(state => state.post.home);
  const postsEm = useSelector(state => state.post.em);
  const user = useSelector(state => state.login.user);
  const dispatch = useDispatch();
  const [page, setPage] = useState();
  const [showPost, setShowPost] = useState(false);
  const [postText, setPostText] = useState();
  const [modifica, setModifica] = useState(false);
  const [idPost, setIdPost] = useState("");
  const handleClosePost = () => setShowPost(false);
  const handleShowPost = () => setShowPost(true);

  const delPost = async postId => {
    try {
      console.log("cancella");

      const resp = await fetch(``, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " // + token
        }
      });
      if (resp.ok) {
      }
    } catch (error) {
      console.log("si e' verificato un errore", error.message);
    }
  };

  useEffect(() => {
    dispatch(fetchPostHome());
    dispatch(fetchPostHomeEmiliaRomagna());
    setPage(1);
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
                <p className="shadow-p">
                  NOLEGGIA UN VAN PER LA TUA PROSSIMA VACANZA, E VIVI UN AVVENTUA INDIMENTICABILE
                </p>
              </Container>
            </Col>
          </Row>
        </Col>

        <Col
          sm={4}
          style={{ width: "100vw" }}
          className="text-black">
          <Row className="row-cols-1 mt-5 ">
            <Col>
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
            <Col>
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
