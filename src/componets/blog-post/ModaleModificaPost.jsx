import { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  Image,
  Modal,
  ModalTitle,
  OverlayTrigger,
  Row,
  Spinner,
  Tooltip
} from "react-bootstrap";
import Dropzone from "react-dropzone";
import { MdOutlineCloudUpload } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
import { useDispatch } from "react-redux";
import { fetchMyPost, fetchPost } from "../../redux/actions";

const ModaleModificaPost = ({
  modifica,
  handleCloseModaleModifica,
  elem,
  setTitlePost,
  titlePost,
  setPostText,
  postText,
  calcolaData,
  idPost,
  token
}) => {
  const [categoria, setCategoria] = useState(elem.category);
  const category = ["TRAVELERS_STORY", "RECOMMENDED_TRIPS", "MY_VAN"];
  const [checked, setChecked] = useState([false, false, false]);
  // eslint-disable-next-line no-unused-vars
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [loading, setLoading] = useState(false);
  const [formImage, setFormImage] = useState(null);
  const dispatch = useDispatch();
  const renderTooltip = props => (
    <Tooltip
      id="button-tooltip"
      {...props}>
      Modifica immagine post
    </Tooltip>
  );
  const handlerSubmit = async e => {
    e.preventDefault();
    const formCover = new FormData();
    formCover.append("img", formImage[0]);
    setLoading(true);
    try {
      const risp = await fetch(`http://localhost:8080/posts/upload_img/${idPost}`, {
        method: "PATCH",
        body: formCover,
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (risp.ok) {
        setImage(null);
        dispatch(fetchMyPost(token));
        dispatch(fetchPost(token));
        handleClose(false);
      } else {
        throw new Error(risp.status);
      }
    } catch (error) {
      console.log("si e' verificato un errore", error.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchModifyPost = async () => {
    try {
      const risp = await fetch(`http://localhost:8080/posts/modify_post/${idPost}`, {
        method: "PATCH",
        body: JSON.stringify({ text: postText, category: categoria, title: titlePost }),
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token
        }
      });
      if (risp.ok) {
        // setPostText("");
        // setTitlePost("");
        // setCategoria("");
        dispatch(fetchMyPost(token));
        dispatch(fetchPost(token));
        handleClose(false);
        handleCloseModaleModifica(false);
      } else {
        throw new Error(risp.status);
      }
    } catch (error) {
      console.log("si e' verificato un errore", error.message);
    }
  };

  return (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Cambia Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            id="drop"
            className="d-flex justify-content-center "
            onSubmit={handlerSubmit}>
            <Dropzone
              onDrop={acceptedFiles => {
                setFormImage(acceptedFiles);
              }}>
              {({ getRootProps, getInputProps, acceptedFiles }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div class="containerDrop">
                    <div class="headerDrop">
                      <MdOutlineCloudUpload fontSize={100} />
                      <p>Clicca per cercare</p>
                      <p>oppure</p>
                      <p>Trascina l'immagine</p>
                    </div>
                    <label class="footerDrop">{acceptedFiles[0] ? acceptedFiles[0].path : ""}</label>
                  </div>

                  {loading ? (
                    <Row className="d-flex flex-grow-1 justify-content-center align-items-center">
                      <Col className="d-flex justify-content-center align-items-center">
                        <Spinner
                          animation="border"
                          className="mt-5"
                          color="#144658"
                        />
                      </Col>
                    </Row>
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </Dropzone>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <ImCancelCircle
            fontSize={50}
            onClick={handleClose}
            style={{ cursor: "pointer", color: "#144658" }}
          />
          <Button
            style={{ background: "white", border: "white" }}
            type="submit"
            form="drop">
            <FaFileUpload
              fontSize={50}
              style={{ cursor: "pointer", color: "#144658" }}
            />
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={modifica}
        onHide={handleCloseModaleModifica}
        fullscreen={"lg-down"}
        size="lg">
        <Modal.Header closeButton>
          <ModalTitle>Modifica Post</ModalTitle>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-2">
            <Col xs={2}>
              <Image
                src={elem.author.avatar}
                alt="profileImg"
                width="110px"
                height="110px"
                roundedCircle
                style={{ objectFit: "cover" }}
              />
            </Col>
            <Col
              sm={5}
              lg={7}>
              <Form
                id="modificaForm"
                onSubmit={e => {
                  e.preventDefault();
                  if (titlePost && postText && categoria) {
                    fetchModifyPost();
                  } else {
                    console.log("titolo");
                    console.log(titlePost);
                    console.log("testo");
                    console.log(postText);
                    console.log("categoria");
                    console.log(categoria);
                  }
                }}>
                <div className="d-flex align-items-center justify-content-between">
                  <h6>
                    {elem.author.name} {elem.author.surname}
                  </h6>
                  {categoria === "TRAVELERS_STORY" ? (
                    <p style={{ color: "#be311a", fontSize: "1.1em", fontWeight: "bolder", marginBottom: "7px" }}>
                      Storie di viaggi
                    </p>
                  ) : categoria === "RECOMMENDED_TRIPS" ? (
                    <p style={{ color: "#ecc654", fontSize: "1.1em", fontWeight: "bolder", marginBottom: "7px" }}>
                      Viaggi raccomandati
                    </p>
                  ) : categoria === "MY_VAN" ? (
                    <p style={{ color: "#9dca6a", fontSize: "1.1em", fontWeight: "bolder", marginBottom: "7px" }}>
                      Il mio Van
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <FormControl
                  type="text"
                  value={titlePost}
                  onChange={e => {
                    setTitlePost(e.target.value);
                  }}
                />
                <p style={{ fontWeight: "300", fontSize: "12px" }}> {calcolaData()}</p>
                <div>
                  <FormGroup>
                    <textarea
                      className="mx-auto border border-1 rounded"
                      id="testoPost"
                      name="testoPost"
                      rows={5}
                      cols={52}
                      value={postText}
                      onChange={e => {
                        setPostText(e.target.value);
                      }}></textarea>
                  </FormGroup>
                </div>
                <div>
                  {category.map((elem, i) => (
                    <Button
                      key={i}
                      style={{ backgroundColor: checked[i] ? "#F5F9FA" : "white", border: "none" }}
                      onClick={e => {
                        setChecked([...checked.map((c, j) => (j === i ? true : false))]);
                        setCategoria(elem);
                      }}
                      className="rounded ms-2 text-secondary"
                      variant="light">
                      {elem === "TRAVELERS_STORY" ? (
                        <p
                          style={{
                            color: "#be311a",
                            fontSize: "1em",
                            fontWeight: "bolder",
                            marginBottom: "7px"
                          }}>
                          Storie di viaggi
                        </p>
                      ) : elem === "RECOMMENDED_TRIPS" ? (
                        <p
                          style={{
                            color: "#ecc654",
                            fontSize: "1em",
                            fontWeight: "bolder",
                            marginBottom: "7px"
                          }}>
                          Viaggi raccomandati
                        </p>
                      ) : elem === "MY_VAN" ? (
                        <p
                          style={{
                            color: "#9dca6a",
                            fontSize: "1em",
                            fontWeight: "bolder",
                            marginBottom: "7px"
                          }}>
                          Il mio Van
                        </p>
                      ) : (
                        ""
                      )}
                    </Button>
                  ))}
                </div>
              </Form>
              <div className="text-end">
                <OverlayTrigger
                  placement="left"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}>
                  <Button style={{ background: "#00000000", border: "none" }}>
                    <FaRegPenToSquare
                      className="m-0"
                      onClick={e => {
                        setShow(true);
                      }}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        fontSize: "1em",
                        color: "black"
                      }}
                    />
                  </Button>
                </OverlayTrigger>
                <Image
                  src={elem.img ? elem.img : ""}
                  className="rounded-4 shadow"
                  width="100%"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <ImCancelCircle
            fontSize={50}
            onClick={handleCloseModaleModifica}
            style={{ cursor: "pointer", color: "#144658" }}
          />
          <Button
            style={{ background: "white", border: "white" }}
            type="submit"
            form="modificaForm">
            <FaFileUpload
              fontSize={50}
              style={{ cursor: "pointer", color: "#144658" }}
            />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModaleModificaPost;
