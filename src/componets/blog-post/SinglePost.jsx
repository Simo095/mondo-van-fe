import { Col, Image, Modal, Row } from "react-bootstrap";
import { BsDashLg, BsPencilFill, BsPlusLg, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddFriend, fetchDeleteFriend } from "../../redux/actions/fetchActions";
import { fetchDeletePost } from "../../redux/actions";
import { useState } from "react";

const SinglePost = ({ elem, profile }) => {
  const list = useSelector(state => state.login.user.friends);
  const token = useSelector(state => state.login.token);
  const [showModale, setShowModale] = useState(false);
  const [postText, setPostText] = useState();
  const [modifica, setModifica] = useState(false);
  const [idPost, setIdPost] = useState("");
  const [show, setShow] = useState(false);
  const handleCloseQ = () => setShowModale(false);
  const handleshowModale = () => setShowModale(true);
  const dispatch = useDispatch();
  const calcolaData = () => {
    const createdate = new Date(elem.createdAt);
    const createMin = createdate.getMinutes();
    const createOre = createdate.getHours();
    const createGiorni = createdate.getDay();
    const createMesi = createdate.getMonth();
    const createAnno = createdate.getFullYear();
    const actualdate = new Date();
    const actualMin = actualdate.getMinutes();
    const actualOre = actualdate.getHours();
    const actualGiorni = actualdate.getDay();
    const actualMesi = actualdate.getMonth();
    const actualAnno = actualdate.getFullYear();
    if (actualAnno === createAnno) {
      if (actualMesi === createMesi) {
        if (actualGiorni === createGiorni) {
          if (actualOre === createOre) {
            if (actualMin === createMin) {
              return "adesso";
            } else return `${actualMin - createMin} ${actualMin - createMin === 1 ? "minuto fa" : "minuti fa"}`;
          } else return `${actualOre - createOre} ${actualOre - createOre === 1 ? "ora fa" : "ore fa"}`;
        } else return `${actualGiorni - createGiorni} ${actualGiorni - createGiorni === 1 ? "giorno fa" : "giorni fa"}`;
      } else return `${actualMesi - createMesi} ${actualMesi - createMesi === 1 ? "mese fa" : "mesi fa"}`;
    } else return `${actualAnno - createAnno} ${actualAnno - createAnno === 1 ? "anno fa" : "anni fa"}`;
  };

  return (
    elem &&
    profile && (
      <div className="border SinglePostAll border-1 rounded-3 shadow my-3 p-3 bg-light">
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
                  style={{ objectFit: "cover" }}
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
                    {console.log(profile.id)}
                    <BsPencilFill
                      onClick={() => {
                        setIdPost(elem.id);

                        setModifica(true);
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
              <p onClick={handleshowModale}>{elem.text}</p>
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
          <Modal.Footer></Modal.Footer>
        </Modal>

        <Row
          style={{ width: "400px" }}
          className="mb-2">
          <Col>
            <Image
              src={elem.author.avatar}
              alt="profileImg"
              width="60px"
              height="60px"
              roundedCircle
              style={{ objectFit: "cover" }}
            />
          </Col>
          <Col
            onClick={handleshowModale}
            sm={5}
            lg={7}
            className=" order-5 order-sm-0">
            <div className="d-flex flex-column">
              <h6>
                {elem.author.name} {elem.author.surname}
              </h6>
              <p
                className="w-100 mb-0"
                style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", fontSize: "14px" }}>
                {elem.title}
              </p>
              <p style={{ fontWeight: "300", fontSize: "12px" }}> {calcolaData()}</p>
            </div>
          </Col>
          <Col
            xs={12}
            sm={3}
            className="text-primary d-flex justify-content-between flex-grow-1">
            <p>
              {elem.category === "TRAVELERS_STORY"
                ? "Storie di viaggi"
                : elem.category === "RECOMMENDED_TRIPS"
                ? "Viaggi raccomandati"
                : elem.category === "MY_VAN"
                ? "Il mio van"
                : ""}
            </p>
            {profile.id !== elem.author.id &&
              (list.find(x => x === elem.author.id) ? (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    dispatch(fetchDeleteFriend(token, elem.author.id));
                  }}>
                  <BsDashLg className="me-2" />
                  <span className="d-none d-sm-inline-block">SEGUI GIA'</span>
                </div>
              ) : (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    console.log(elem);
                    dispatch(fetchAddFriend(token, elem.author.id));
                  }}>
                  <BsPlusLg className="me-2" />
                  <span className="d-none d-sm-inline-block">SEGUI</span>
                </div>
              ))}

            {profile.id === elem.author.id && (
              <div>
                {console.log(profile.id)}
                <BsPencilFill
                  onClick={() => {
                    setIdPost(elem.id);

                    setModifica(true);
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
              </div>
            )}
          </Col>
          <p
            onClick={handleshowModale}
            style={{
              textDecoration: "none",
              cursor: "pointer",
              color: "black",
              fontSize: "15px",
              fontFamily: "Rethink Sans, sans-serif",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              marginBottom: "1rem"
            }}>
            {elem.text}
          </p>
          <Col
            xs={12}
            className="d-flex justify-content-center"
            onClick={handleshowModale}>
            {elem.img ? (
              <Image
                src={elem.img}
                width="100%"
                height={300}
                style={{ objectFit: "cover" }}
                className="rounded-4 shadow"
              />
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </div>
    )
  );
};
export default SinglePost;
