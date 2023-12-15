import { Col, Image, Row } from "react-bootstrap";

const SinglePostHome = ({ elem }) => {
  return (
    elem && (
      <div className="border border-1 rounded-3 shadow my-3 p-3 bg-light">
        <Row className="mb-2">
          <Col
            sm={2}
            className="me-3">
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
              <p
                className="w-100 mb-0"
                style={{ whiteSpace: "wrap", textOverflow: "ellipsis", overflow: "hidden", fontSize: "18px" }}>
                {elem.title}
              </p>
            </div>
          </Col>
          <Col
            xs={12}
            className="d-flex justify-content-center">
            <Image
              src={elem.img ? elem.img : ""}
              width="300px"
              height="200px"
              style={{ objectFit: "cover" }}
              className="rounded-4 shadow"
            />
          </Col>
        </Row>
      </div>
    )
  );
};
export default SinglePostHome;
