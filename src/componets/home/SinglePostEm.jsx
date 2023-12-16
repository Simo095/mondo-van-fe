import { Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const SinglePostEm = ({ elem }) => {
  const navigate = useNavigate();
  return (
    elem && (
      <div className="SinglePostER border border-1 rounded-3 shadow my-3 p-3 bg-light">
        <Row className="mb-2 d-flex align-items-center">
          <Col
            sm={2}
            className="me-3">
            <Image
              src={"https://api.dicebear.com/7.x/personas/svg"}
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
            <div className="d-flex flex-column align-items-center">
              <Link
                className="SinglePostER"
                to={elem.permalink}>
                <p
                  className=" w-100 mb-0"
                  style={{ whiteSpace: "wrap", textOverflow: "ellipsis", overflow: "hidden", fontSize: "15px" }}>
                  {elem.title}
                </p>
              </Link>
            </div>
          </Col>
          <Col
            xs={12}
            className="d-flex justify-content-center">
            <Image
              src={elem.attachments[0].url ? elem.attachments[0].url : ""}
              width="300px"
              height="200px"
              className="rounded-4 shadow"
              style={{ objectFit: "cover" }}
            />
          </Col>
          <Col
            xs={12}
            sm={3}
            className="text-primary text-end "></Col>
          <p
            className="m-0 mt-2"
            style={{ whiteSpace: "wrap", textOverflow: "ellipsis", overflow: "hidden", fontSize: "13px" }}>
            Autore: {elem.author.name}
          </p>
        </Row>
      </div>
    )
  );
};
export default SinglePostEm;
