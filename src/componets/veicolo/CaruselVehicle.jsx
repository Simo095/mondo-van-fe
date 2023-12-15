import { useState } from "react";
import { Button, Carousel, Form, Modal, Spinner } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { FaRegPenToSquare } from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi2";
import { RiArrowGoBackLine, RiSendPlaneFill } from "react-icons/ri";
import { useNavigate } from "react-router";

const CaruselVehicle = ({ vehicle, cover, token, height }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coverImg, setCover] = useState(null);

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const modifyCover = () => setShow(true);

  const deleteCover = async nCover => {
    const coverfetch = await fetch(`http://localhost:8080/vehicles/remove_img?urlImg=${nCover}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token
      }
    });
    if (coverfetch.ok) {
      navigate("/change");
    }
  };

  const handlerSubmitCover = async e => {
    e.preventDefault();
    const formCover = new FormData();
    formCover.append("img", coverImg[0]);
    setLoading(true);
    if (cover) {
      const coverfetch = await fetch("http://localhost:8080/vehicles/upload_img", {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token
        },
        body: formCover
      });
      if (coverfetch.ok) {
        navigate("/change");
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Immagine di copertina</Modal.Title>
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
                <>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div
                      style={{
                        border: "3px",
                        borderStyle: "dashed",
                        borderRadius: "30px",
                        borderColor: "ActiveBorder"
                      }}
                      className="text-center">
                      {acceptedFiles[0]
                        ? acceptedFiles[0].path
                        : "Tracina l'immagine che desideri come cover \noppure clicca sul qui per aprire explore e selezionarla"}
                    </div>
                    {loading ? (
                      <Spinner
                        animation="border"
                        className="mt-5"
                        variant="success"
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              )}
            </Dropzone>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <RiArrowGoBackLine
            onClick={handleClose}
            style={{ cursor: "pointer" }}
          />
          <Button
            style={{ background: "white", border: "white" }}
            type="submit"
            form="drop">
            <RiSendPlaneFill style={{ cursor: "pointer", color: "blue" }} />
          </Button>
        </Modal.Footer>
      </Modal>
      <Carousel
        interval={null}
        indicators={false}>
        <Carousel.Item>
          <div
            className="d-flex justify-content-end"
            style={{
              backgroundImage: `url(${vehicle.avatar[0] ? vehicle.avatar[0] : cover})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "5px",
              height: `${height}px`
            }}>
            {height === 500 ? (
              <>
                <div
                  className="d-flex align-items-start justify-content-center"
                  style={{
                    backgroundColor: "black",
                    opacity: "0.3",
                    borderRadius: "30px",
                    height: "40px",
                    width: "40px"
                  }}>
                  <HiOutlineTrash
                    className="mt-2"
                    onClick={() => deleteCover(vehicle.avatar[0])}
                    style={{
                      cursor: "pointer",
                      opacity: "0.5",
                      fontSize: "1.5em",
                      color: "white"
                    }}
                  />
                </div>
                <div
                  className="d-flex align-items-start justify-content-center"
                  style={{
                    backgroundColor: "black",
                    opacity: "0.3",
                    borderRadius: "30px",
                    height: "40px",
                    width: "40px"
                  }}>
                  <FaRegPenToSquare
                    className="mt-2"
                    onClick={modifyCover}
                    style={{
                      cursor: "pointer",
                      opacity: "0.5",
                      fontSize: "1.5em",
                      color: "white"
                    }}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className="d-flex justify-content-end"
            style={{
              backgroundImage: `url(${vehicle.avatar[1] ? vehicle.avatar[1] : cover})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "10px",
              height: `${height}px`
            }}>
            {height === 500 ? (
              <>
                <div
                  className="d-flex align-items-start justify-content-center"
                  style={{
                    backgroundColor: "black",
                    opacity: "0.3",
                    borderRadius: "30px",
                    height: "40px",
                    width: "40px"
                  }}>
                  <HiOutlineTrash
                    className="mt-2"
                    onClick={() => deleteCover(vehicle.avatar[1])}
                    style={{
                      cursor: "pointer",
                      opacity: "0.5",
                      fontSize: "1.5em",
                      color: "white"
                    }}
                  />
                </div>
                <div
                  className="d-flex align-items-start justify-content-center"
                  style={{
                    backgroundColor: "black",
                    opacity: "0.3",
                    borderRadius: "30px",
                    height: "40px",
                    width: "40px"
                  }}>
                  <FaRegPenToSquare
                    className="mt-2"
                    onClick={modifyCover}
                    style={{
                      cursor: "pointer",
                      opacity: "0.5",
                      fontSize: "1.5em",
                      color: "white"
                    }}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className="d-flex justify-content-end"
            style={{
              backgroundImage: `url(${vehicle.avatar[2] ? vehicle.avatar[2] : cover})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "10px",
              height: `${height}px`
            }}>
            {height === 500 ? (
              <>
                <div
                  className="d-flex align-items-start justify-content-center"
                  style={{
                    backgroundColor: "black",
                    opacity: "0.3",
                    borderRadius: "30px",
                    height: "40px",
                    width: "40px"
                  }}>
                  <HiOutlineTrash
                    className="mt-2"
                    onClick={() => deleteCover(vehicle.avatar[2])}
                    style={{
                      cursor: "pointer",
                      opacity: "0.5",
                      fontSize: "1.5em",
                      color: "white"
                    }}
                  />
                </div>
                <div
                  className="d-flex align-items-start justify-content-center"
                  style={{
                    backgroundColor: "black",
                    opacity: "0.3",
                    borderRadius: "30px",
                    height: "40px",
                    width: "40px"
                  }}>
                  <FaRegPenToSquare
                    className="mt-2"
                    onClick={modifyCover}
                    style={{
                      cursor: "pointer",
                      opacity: "0.5",
                      fontSize: "1.5em",
                      color: "white"
                    }}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};
export default CaruselVehicle;
