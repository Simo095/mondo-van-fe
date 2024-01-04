import { Alert, Button, Col, Form, FormControl, Image, Modal, Row, Spinner } from "react-bootstrap";
import Dropzone from "react-dropzone";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchMyPost, fetchPost } from "../../redux/actions";

import { BsCheck2, BsImageFill } from "react-icons/bs";

const ModaleAddPost = ({ handleClose, show, profile, postText, setPostText, modifica }) => {
  const token = useSelector(state => state.login.token);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const category = ["TRAVELERS_STORY", "RECOMMENDED_TRIPS", "MY_VAN"];
  const [checked, setChecked] = useState([false, false, false]);
  const [categoria, setCategoria] = useState("");
  const [title, setTitle] = useState("");
  const [errorCategory2, setErrorCategory2] = useState(false);

  const fetchEditPost = async () => {
    try {
      const risp = await fetch(`http://localhost:8080/posts`, {
        method: "POST",
        body: JSON.stringify({ text: postText, category: categoria, title: title }),
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token
        }
      });
      if (risp.ok) {
        if (image) {
          const savedPost = await risp.json();
          handleImage(savedPost.id);
        }
        setPostText("");
        setTitle("");
        setCategoria("");
        dispatch(fetchMyPost(token));
        dispatch(fetchPost(token));
        handleClose(false);
      } else {
        throw new Error(risp.status);
      }
    } catch (error) {
      console.log("si e' verificato un errore", error.message);
    }
  };

  const handleImage = async id => {
    const formImage = new FormData();
    formImage.append("img", image[0]);
    try {
      const risp = await fetch(`http://localhost:8080/posts/upload_img/${id}`, {
        method: "PATCH",
        body: formImage,
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
    }
  };

  return (
    profile && (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          fullscreen="lg-down">
          <Modal.Header closeButton>
            <Image
              src={profile.avatar}
              alt="profileImg"
              width="60px"
              height="60px"
              roundedCircle
              style={{ objectFit: "cover" }}
            />
            <Modal.Title className="ms-3">{`${profile.name} ${profile.surname}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column">
            <Form
              id="formPost"
              onSubmit={e => {
                e.preventDefault();
                if (categoria === "") {
                  setErrorCategory2(true);
                } else {
                  fetchEditPost(e);
                }
              }}>
              <FormControl
                type="text"
                className="mb-4"
                placeholder="Titolo del post..."
                onChange={e => {
                  setTitle(e.target.value);
                }}></FormControl>
              <textarea
                className="mx-auto"
                id="testoPost"
                name="testoPost"
                rows="4"
                cols="50"
                defaultValue={postText}
                placeholder="Inserisci il testo qui"
                onChange={e => {
                  setPostText(e.target.value);
                }}></textarea>
              <div className="mt-3">
                {
                  <Dropzone
                    onDrop={acceptedFiles => {
                      setImage(acceptedFiles);
                    }}>
                    {({ getRootProps, getInputProps, acceptedFiles }) => (
                      <div
                        className="btn btn-light  text-secondary"
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        {image ? <BsCheck2 /> : <BsImageFill />}
                        {acceptedFiles[0] ? acceptedFiles[0].path : ""}
                      </div>
                    )}
                  </Dropzone>
                }
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
                {errorCategory2 && <Alert variant="danger">Seleziona una categoria del post</Alert>}
                {category.map((elem, i) => (
                  <Button
                    key={i}
                    style={{ backgroundColor: checked[i] ? "#F5F9FA" : "white", border: "none" }}
                    onClick={e => {
                      setChecked([...checked.map((c, j) => (j === i ? true : false))]);
                      setCategoria(elem);
                      setErrorCategory2(false);
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
          </Modal.Body>

          <Modal.Footer>
            <Button
              className="text-secondary rounded-5"
              variant="light"
              type="submit"
              form="formPost">
              Pubblica
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  );
};

export default ModaleAddPost;
