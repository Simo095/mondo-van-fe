import { Alert, Button, Col, FormControl, Image, Modal, Row, Spinner } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import Dropzone from "react-dropzone";
import { useState } from "react";
import { fetchMyPost, fetchPost } from "../../redux/actions";
import { BsCalendar3, BsCheck2, BsImageFill, BsPatchPlusFill, BsThreeDots } from "react-icons/bs";
import { MdOutlineCloudUpload } from "react-icons/md";

const ModaleAddPost = ({ handleClose, show, profile, postText, setPostText, modifica }) => {
  const token = useSelector(state => state.login.token);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categoria, setCategoria] = useState("");
  const [title, setTitle] = useState("");
  const [errorCategory, setErrorCategory] = useState(true);
  const [errorCategory2, setErrorCategory2] = useState(false);

  const fetchEditPost = async () => {
    try {
      if (errorCategory) {
        setErrorCategory(false);
        setErrorCategory2(true);
      } else {
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
          dispatch(fetchMyPost(token));
          dispatch(fetchPost(token));
          handleClose(false);
        } else {
          throw new Error(risp.status);
        }
      }
    } catch (error) {
      console.log("si e' verificato un errore", error.message);
    } finally {
    }
  };

  const handleImage = async id => {
    const formImage = new FormData();
    formImage.append("img", image[0]);
    console.log("ehe");
    console.log(formImage.get("img"));
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
            <FormControl
              type="text"
              className="mb-4"
              placeholder="Titolo del post..."
              onChange={e => {
                setErrorCategory(true);
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
              <Button
                onClick={e => {
                  setErrorCategory(false);
                  setErrorCategory2(false);
                  setCategoria("TRAVELERS_STORY");
                }}
                className="rounded ms-2 text-secondary"
                variant="light">
                Storie di viaggi
              </Button>
              <Button
                onClick={e => {
                  setErrorCategory(false);
                  setErrorCategory2(false);
                  setCategoria("RECOMMENDED_TRIPS");
                }}
                className="rounded ms-2 text-secondary"
                variant="light">
                Te lo consiglio!
              </Button>
              <Button
                onClick={e => {
                  setErrorCategory(false);
                  setErrorCategory2(false);
                  setCategoria("MY_VAN");
                }}
                className="rounded ms-2 text-secondary"
                variant="light">
                Il mio Van
              </Button>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              className="text-secondary rounded-5"
              variant="light"
              onClick={() => fetchEditPost()}>
              {modifica ? "Modifica" : "Pubblica"}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  );
};

export default ModaleAddPost;
