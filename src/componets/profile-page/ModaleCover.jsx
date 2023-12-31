import { useState } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { FaFileUpload } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/actions/fetchActions";

const ModaleCover = ({ show, setShow }) => {
  const token = useSelector(state => state.login.token);
  const [coverImg, setCover] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const handlerSubmitCover = async e => {
    e.preventDefault();
    const formCover = new FormData();
    formCover.append("cover", coverImg[0]);
    setLoading(true);
    const coverfetch = await fetch("http://localhost:8080/users/upload_cover", {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token
      },
      body: formCover
    });
    if (coverfetch.ok) {
      dispatch(fetchUser(token));
      setLoading(false);
    }

    handleClose();
  };
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Cambia immagine copertina</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          id="drop"
          className="d-flex justify-content-center "
          onSubmit={handlerSubmitCover}>
          <Dropzone
            onDrop={acceptedFiles => {
              setCover(acceptedFiles);
            }}>
            {({ getRootProps, getInputProps, acceptedFiles }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="containerDrop">
                  <div className="headerDrop">
                    <MdOutlineCloudUpload fontSize={100} />
                    <p>Clicca per cercare</p>
                    <p>oppure</p>
                  </div>
                  <label className="footerDrop">
                    {acceptedFiles[0] ? acceptedFiles[0].path : "Trascina l'immagine"}
                  </label>
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
  );
};
export default ModaleCover;
