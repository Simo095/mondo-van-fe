import { Button, Col, Container, Form, Modal, Row, Spinner } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { FiLogOut } from "react-icons/fi";
import { FaRegPenToSquare } from "react-icons/fa6";
import { RiArrowGoBackLine, RiSendPlaneFill } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchUser } from "../../redux/actions/fetchActions";

import vanSide from "../../assets/icone/van-side.png";
import lente from "../../assets/icone/lente.png";
import blog from "../../assets/icone/Blog.png";

import "../../assets/style/sidebar-button.css";
const SideBar = () => {
  const user = useSelector(state => state.login.user);
  const vehicle = useSelector(state => state.vehicles.vehicle);
  const token = useSelector(state => state.login.token);
  const [show, setShow] = useState(false);
  const [coverImg, setCover] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handlerSubmitAvatar = async e => {
    e.preventDefault();
    const formCover = new FormData();
    formCover.append("avatar", coverImg[0]);
    setLoading(true);

    const coverfetch = await fetch("http://localhost:8080/users/upload_avatar", {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token
      },
      body: formCover
    });
    if (coverfetch.ok) {
      await dispatch(fetchUser(token, navigate));
      setLoading(false);
    }

    handleClose();
  };

  return (
    <>
      <div className="SideBar">
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>Immagine di copertina</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              id="drop"
              className="d-flex justify-content-center "
              onSubmit={handlerSubmitAvatar}>
              <Dropzone
                onDrop={acceptedFiles => {
                  setCover(acceptedFiles);
                }}>
                {({ getRootProps, getInputProps, acceptedFiles }) => (
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
        {user.role === "CUSTOMER" ? (
          <Container className="main mt-5 ms-5">
            <h2>VAN WORLD</h2>
            <div className="up">
              <Button
                href="/"
                style={{
                  backgroundImage: `url(${lente})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundPositionY: "9px"
                }}
                className="card1"></Button>
              <Button
                href="#"
                style={{
                  backgroundImage: `url(${blog})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "contain"
                }}
                className="card2"></Button>
            </div>
            <div className="down">
              <Button
                href="/profile_customer"
                style={{
                  position: "relative",
                  backgroundImage: `url(${user.avatar})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover"
                }}
                className="card3 d-flex align-items-start justify-content-end">
                <FaRegPenToSquare
                  className="m-0"
                  onClick={e => {
                    e.preventDefault();
                    setShow(true);
                  }}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    fontSize: "1em",
                    color: "white"
                  }}
                />
              </Button>
              <Button
                href="/log_out"
                className="card4 text-black">
                <FiLogOut
                  color="black"
                  fontSize={40}
                />
                Logout
              </Button>
            </div>
          </Container>
        ) : user.role === "OWNER" ? (
          <Container className="main mt-5 ms-5">
            <h2>VAN WORLD</h2>
            <div className="up">
              <Button
                href="/"
                style={{
                  backgroundImage: `url(${lente})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundPositionY: "9px"
                }}
                className="card1"></Button>
              <Button
                href="/profile_vehicle"
                style={{
                  backgroundImage: `url(${vanSide})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "contain"
                }}
                className="card2"></Button>
            </div>
            <div className="down">
              <Button
                href="/profile_owner"
                style={{
                  position: "relative",
                  backgroundImage: `url(${user.avatar})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover"
                }}
                className="card3 d-flex align-items-start justify-content-end">
                <FaRegPenToSquare
                  className="m-0"
                  onClick={e => {
                    e.preventDefault();
                    setShow(true);
                  }}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    fontSize: "1em",
                    color: "white"
                  }}
                />
              </Button>
              <Button
                href="/log_out"
                className="card4 text-black">
                <FiLogOut
                  color="black"
                  fontSize={40}
                />
                Logout
              </Button>
            </div>
          </Container>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default SideBar;
