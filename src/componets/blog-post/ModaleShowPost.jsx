import { Col, Image, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeletePost, fetchProfileUser } from "../../redux/actions";
import { useNavigate } from "react-router";
import { BsPencilFill, BsTrash } from "react-icons/bs";

const ModaleShowPost = ({
  showModale,
  handleCloseQ,
  elem,
  calcolaData,
  profile,
  setModifica,
  setIdPost,
  setTitlePost,
  setPostText
}) => {
  const token = useSelector(state => state.login.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Modal
        show={showModale}
        onHide={handleCloseQ}
        fullscreen={"lg-down"}
        size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{elem.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-2">
            <Col xs={2}>
              <Image
                src={elem.author.avatar}
                alt="profileImg"
                width="80px"
                height="80px"
                roundedCircle
                style={{ objectFit: "cover", cursor: "pointer" }}
                onClick={() => {
                  dispatch(fetchProfileUser(token, elem.author.id));
                  navigate(`/profile/${elem.author.id}`);
                }}
              />
            </Col>
            <Col
              sm={5}
              lg={7}
              className=" order-5 order-sm-0">
              <div className="d-flex flex-column">
                <h6>
                  {elem.author.name} {elem.author.surname}
                </h6>
                <p className="w-100 mb-0">{elem.title}</p>
                <p style={{ fontWeight: "300", fontSize: "12px" }}> {calcolaData()}</p>
              </div>
            </Col>
            <Col
              xs={12}
              sm={3}
              className="text-primary text-end ">
              {profile.id === elem.author.id && (
                <>
                  <BsPencilFill
                    onClick={() => {
                      setModifica(true);
                      setIdPost(elem.id);
                      setTitlePost(elem.title);
                      setPostText(elem.text);
                    }}
                    style={{ cursor: "pointer", color: "red" }}
                  />
                  <BsTrash
                    className="text-danger ms-2"
                    onClick={() => {
                      dispatch(fetchDeletePost(token, elem.id));
                    }}
                    style={{ cursor: "pointer", color: "red" }}
                  />
                </>
              )}
            </Col>
            <p>{elem.text}</p>
            <Col className="d-flex justify-content-center">
              <Image
                src={elem.img ? elem.img : ""}
                className="rounded-4 shadow"
                width="100%"
                style={{ objectFit: "cover" }}
              />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ModaleShowPost;
