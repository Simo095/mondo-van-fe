import { Col, Image, Row } from "react-bootstrap";
import { BsDashLg, BsPencilFill, BsPlusLg, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const MyFriendsPost = ({
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
  const dispatch = useDispatch();

  const calcolaData = () => {
    const createdateWithMs = new Date(elem.createdAt);
    const output = createdateWithMs.toLocaleString("it-IT");
    return output;
  };
  return (
    elem &&
    profile && (
      <div className="border SinglePostAll border-1 w-50 rounded-3 shadow my-3 p-3 bg-light">
        <Row className=" justify-content-between mb-2">
          <Col xs="auto">
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
                      //dispatch(deleteFriendAction(elem.author.id));
                    }}
                  />
                  <span>SEGUI GIA'</span>
                </>
              ) : (
                <>
                  <BsPlusLg
                    className="me-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      //dispatch(addFriendAction(elem.author));
                    }}
                  />
                  <span className="d-none d-sm-inline-block">SEGUI</span>
                </>
              ))}
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
export default MyFriendsPost;
