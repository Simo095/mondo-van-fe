import { Col, Image, Row } from "react-bootstrap";
import { BsPencilFill, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddFriend, fetchDeleteFriend } from "../../redux/actions/fetchActions";
import { fetchDeletePost, fetchProfileUser } from "../../redux/actions";
import { useState } from "react";
import { useNavigate } from "react-router";

import ModaleShowPost from "./ModaleShowPost";
import ModaleModificaPost from "./ModaleModificaPost";

const SinglePost = ({ elem, profile }) => {
  const list = useSelector(state => state.login.user.friends);
  const token = useSelector(state => state.login.token);
  const [showModale, setShowModale] = useState(false);

  const [postText, setPostText] = useState("");
  const [modifica, setModifica] = useState(false);
  const [idPost, setIdPost] = useState("");
  const [titlePost, setTitlePost] = useState("");

  const handleCloseModale = () => setShowModale(false);
  const handleshowModale = () => setShowModale(true);
  const handleCloseModaleModifica = () => setModifica(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const calcolaData = () => {
    if (elem.updateAt) {
      const update = new Date(elem.updateAt);
      return update.toLocaleDateString("it-IT");
    } else {
      const createDate = new Date(elem.createdAt);
      return createDate.toLocaleDateString("it-IT");
    }
  };

  return (
    elem &&
    profile && (
      <div className="border SinglePostAll border-1 rounded-3 shadow my-3 p-3 bg-light">
        <ModaleShowPost
          showModale={showModale}
          handleCloseQ={handleCloseModale}
          elem={elem}
          calcolaData={calcolaData}
          profile={profile}
          setModifica={setModifica}
          setIdPost={setIdPost}
          setTitlePost={setTitlePost}
          setPostText={setPostText}
        />
        <ModaleModificaPost
          modifica={modifica}
          handleCloseModaleModifica={handleCloseModaleModifica}
          elem={elem}
          setTitlePost={setTitlePost}
          titlePost={titlePost}
          setPostText={setPostText}
          postText={postText}
          idPost={idPost}
          calcolaData={calcolaData}
          token={token}
        />

        <Row
          style={{ width: "400px" }}
          className="mb-2">
          <Col xs={2}>
            <Image
              src={elem.author.avatar}
              alt="profileImg"
              width="60px"
              height="60px"
              roundedCircle
              style={{ objectFit: "cover", cursor: "pointer" }}
              onClick={() => {
                dispatch(fetchProfileUser(token, elem.author.id, navigate));
              }}
            />
          </Col>
          <Col
            style={{ cursor: "pointer" }}
            onClick={handleshowModale}
            sm={10}
            className="order-5 order-sm-0">
            <div className="d-flex flex-column">
              <h6>
                {elem.author.name} {elem.author.surname} -{" "}
                {elem.author.role === "CUSTOMER" ? "Viaggiatore" : "Noleggiatore e Viaggiatore"}
              </h6>
              <p
                className="mb-0"
                style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", fontSize: "14px" }}>
                {elem.title}
              </p>
              <p style={{ fontWeight: "300", fontSize: "12px" }}> {calcolaData()}</p>
            </div>
          </Col>
          <Col
            xs={10}
            className="d-flex justify-content-between flex-grow-1">
            {elem.category === "TRAVELERS_STORY" ? (
              <p style={{ color: "#be311a", fontSize: "1.1em", fontWeight: "bolder" }}>Storie di viaggi</p>
            ) : elem.category === "RECOMMENDED_TRIPS" ? (
              <p style={{ color: "#ecc654", fontSize: "1.1em", fontWeight: "bolder" }}>Viaggi raccomandati</p>
            ) : elem.category === "MY_VAN" ? (
              <p style={{ color: "#9dca6a", fontSize: "1.1em", fontWeight: "bolder" }}>Il mio Van</p>
            ) : (
              ""
            )}

            {profile.id !== elem.author.id &&
              (list.find(x => x === elem.author.id) ? (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    dispatch(fetchDeleteFriend(token, elem.author.id));
                  }}>
                  <span className="border p-1 border-secondary rounded-5 d-sm-inline-block">Smetti di seguire</span>
                </div>
              ) : (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    console.log(elem);
                    dispatch(fetchAddFriend(token, elem.author.id));
                  }}>
                  <span className="border p-1 border-secondary rounded-5 d-sm-inline-block">Segui</span>
                </div>
              ))}

            {profile.id === elem.author.id && (
              <div>
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
            style={{ cursor: "pointer" }}
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
