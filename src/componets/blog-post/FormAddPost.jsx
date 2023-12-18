import { Button, Col, Container, Image, Row } from "react-bootstrap";

import ModaleAddPost from "./ModaleAddPost";
import { useState } from "react";
import { BsBlockquoteLeft, BsCalendar3, BsImageFill } from "react-icons/bs";

const FormAddPost = ({ user }) => {
  const [postText, setPostText] = useState();
  const [modifica, setModifica] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Container className="mt-4">
        <Row className="border rounded-3 border-1 shadow mb-3 gy-3 bg-light">
          <Col className="">
            <Row>
              <Col xs="auto">
                <Image
                  src={user ? user.avatar : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
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
          <Col
            xs={12}
            className="">
            <Row>
              <Col
                xs={12}
                md={5}>
                <p>
                  <span className="text-primary me-2 ms-lg-3">
                    <BsImageFill />
                  </span>
                  <span style={{ color: "grey", fontSize: "14px" }}>Contenuti multimediali</span>
                </p>
              </Col>
              <Col
                xs={12}
                md={3}>
                <p>
                  <span
                    style={{ color: "orange" }}
                    className="me-2">
                    <BsCalendar3 />
                  </span>
                  <span style={{ color: "grey", fontSize: "14px" }}>Evento</span>
                </p>
              </Col>
              <Col
                xs={12}
                md={4}>
                <p>
                  <span className="me-2 text-danger">
                    <BsBlockquoteLeft />
                  </span>
                  <span style={{ color: "grey", fontSize: "14px" }}>Scrivi un articolo</span>
                </p>
              </Col>
            </Row>
          </Col>
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
    </>
  );
};
export default FormAddPost;
