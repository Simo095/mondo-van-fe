import { Col, Image, Row } from "react-bootstrap";
import { BsDashLg, BsPencilFill, BsPlusLg, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddFriend, fetchDeleteFriend } from "../../redux/actions/fetchActions";

const SinglePost = ({
  elem,
  cancella,
  profile,
  handleShow,
  handleClose,
  show,
  setPostText,
  setModifica,
  setIdPost
}) => {
  const list = useSelector(state => state.login.user.friends);
  const token = useSelector(state => state.login.token);
  const dispatch = useDispatch();
  // const calcolaData = () => {
  //   const createdate = new Date(elem.createdAt);
  //   const createMin = createdate.getMinutes();
  //   const createOre = createdate.getHours();
  //   const createGiorni = createdate.getDay();
  //   const createMesi = createdate.getMonth();
  //   const createAnno = createdate.getFullYear();
  //   const actualdate = new Date();
  //   const actualMin = actualdate.getMinutes();
  //   const actualOre = actualdate.getHours();
  //   const actualGiorni = actualdate.getDay();
  //   const actualMesi = actualdate.getMonth();
  //   const actualAnno = actualdate.getFullYear();
  //   if (actualAnno === createAnno) {
  //     if (actualMesi === createMesi) {
  //       if (actualGiorni === createGiorni) {
  //         if (actualOre === createOre) {
  //           if (actualMin === createMin) {
  //             return "adesso";
  //           } else return `${actualMin - createMin} ${actualMin - createMin === 1 ? "minuto fa" : "minuti fa"}`;
  //         } else return `${actualOre - createOre} ${actualOre - createOre === 1 ? "ora fa" : "ore fa"}`;
  //       } else return `${actualGiorni - createGiorni} ${actualGiorni - createGiorni === 1 ? "giorno fa" : "giorni fa"}`;
  //     } else return `${actualMesi - createMesi} ${actualMesi - createMesi === 1 ? "mese fa" : "mesi fa"}`;
  //   } else return `${actualAnno - createAnno} ${actualAnno - createAnno === 1 ? "anno fa" : "anni fa"}`;
  // };
  const calcolaData = () => {
    const createdateWithMs = new Date(elem.createdAt);
    const output = createdateWithMs.toLocaleString("it-IT");
    return output;
  };
  return (
    elem &&
    profile && (
      <div className="border SinglePostAll w-50 border-1 rounded-3 shadow my-3 p-3 bg-light">
        <Row className=" justify-content-between mb-2">
          <Col>
            <Image
              src={
                elem ? elem.author.avatar : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
              }
              alt="profileImg"
              width="60px"
              height="60px"
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
            className="text-primary text-end ">
            {profile.id !== elem.author.id &&
              (list.find(x => x.id === elem.author.id) ? (
                <>
                  <BsDashLg
                    className="me-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      dispatch(fetchDeleteFriend(token, elem.author.id));
                    }}
                  />
                  <span className="d-none d-sm-inline-block">SEGUI GIA'</span>
                </>
              ) : (
                <>
                  <BsPlusLg
                    className="me-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      console.log(elem);
                      dispatch(fetchAddFriend(token, elem.author.id));
                    }}
                  />
                  <span className="d-none d-sm-inline-block">SEGUI</span>
                </>
              ))}
            {profile.id === elem.author.id && (
              <>
                {console.log(profile.id)}
                <BsPencilFill
                  onClick={() => {
                    setIdPost(elem.id);
                    handleShow();
                    setModifica(true);
                    setPostText(elem.text);
                  }}
                  style={{ cursor: "pointer", color: "red" }}
                />
                <BsTrash
                  className="text-danger ms-2"
                  onClick={() => {
                    cancella(elem.id);
                  }}
                  style={{ cursor: "pointer", color: "red" }}
                />
              </>
            )}
          </Col>
          <p
            className=""
            style={{
              fontSize: "15px",
              fontFamily: "Rethink Sans, sans-serif",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden"
            }}>
            {elem.text}
          </p>
          <Col
            xs={12}
            className="d-flex justify-content-center">
            <Image
              src={elem.img ? elem.img : ""}
              width="100%"
              height={300}
              style={{ objectFit: "cover" }}
              className="rounded-4 shadow"
            />
          </Col>
        </Row>
      </div>
    )
  );
};
export default SinglePost;
