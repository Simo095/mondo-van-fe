import { Button, Col, Container, Image, Row } from "react-bootstrap";
import ModaleAddPost from "./ModaleAddPost";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryString, categoryView, fetchPost, fetchPostCategory } from "../../redux/actions";

const FormAddPost = ({ user }) => {
  const [postText, setPostText] = useState();
  const [modifica, setModifica] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const token = useSelector(state => state.login.token);

  return (
    <Container className="mt-4">
      <Row className="border rounded-3 border-1 shadow mb-3 gy-3 bg-light">
        <Col className="">
          <Row className="d-flex align-items-center mb-3">
            <Col xs="auto">
              <Image
                src={user.avatar}
                alt="userImg"
                width="60px"
                height="60px"
                roundedCircle
                style={{ objectFit: "cover" }}
              />
            </Col>
            <Col>
              <Button
                variant="outline-secondary"
                style={{ width: "100%", height: "60px ", borderRadius: "30px", textAlign: "left" }}
                className="ps-2 ps-lg-4 "
                onClick={() => {
                  setModifica(false);
                  handleShow();
                }}>
                Avvia un post
              </Button>
            </Col>
          </Row>
        </Col>

        <Container className="d-flex justify-content-center gap-5">
          <span
            onClick={() => {
              dispatch(categoryView(true));
              dispatch(fetchPostCategory(token, 0, "RECOMMENDED_TRIPS"));
              dispatch(categoryString("RECOMMENDED_TRIPS"));
            }}
            className="me-2"
            style={{ color: "#ecc654", fontSize: "1.1em", fontWeight: "bolder", cursor: "pointer" }}>
            Viaggi raccomandati
          </span>
          <span
            onClick={() => {
              dispatch(categoryView(true));
              dispatch(fetchPostCategory(token, 0, "MY_VAN"));
              dispatch(categoryString("MY_VAN"));
            }}
            style={{ color: "#9dca6a", fontSize: "1.1em", fontWeight: "bolder", cursor: "pointer" }}
            className="me-2">
            Il mio Van
          </span>
          <span
            onClick={() => {
              dispatch(categoryView(true));
              dispatch(fetchPostCategory(token, 0, "TRAVELERS_STORY"));
              dispatch(categoryString("TRAVELERS_STORY"));
            }}
            className="me-2"
            style={{ color: "#be311a", fontSize: "1.1em", fontWeight: "bolder", cursor: "pointer" }}>
            Storie di Viaggi
          </span>
          <span
            onClick={() => {
              dispatch(categoryView(false));
              dispatch(fetchPost(token, 0));
              dispatch(categoryString(""));
            }}
            className="me-2"
            style={{ color: "#144658", fontSize: "1.1em", fontWeight: "bolder", cursor: "pointer" }}>
            Tutti i post
          </span>
        </Container>
      </Row>
      <ModaleAddPost
        handleClose={handleClose}
        show={show}
        profile={user}
        setPostText={setPostText}
        postText={postText}
        modifica={modifica}
      />
    </Container>
  );
};
export default FormAddPost;
