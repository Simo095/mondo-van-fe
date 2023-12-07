import { useState } from "react";
import { Button, Card, Col, FormGroup, Row, ToggleButton } from "react-bootstrap";
import ReactCardFlip from "react-card-flip";
import { Form } from "react-router-dom";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import ReactSwitch from "react-switch";
import { TbCamper } from "react-icons/tb";
import { FaRegSquare } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { checkedCard1 } from "../redux/actions";

const FlipCard = ({ type, image, i, checked, setChecked, serverEnum, setForm }) => {
  const dispatch = useDispatch();
  const [flip, setFlip] = useState(false);
  const [showCheckbox, setShowCheckbox] = useState(false);
  const handlerFlip = e => {
    setFlip(!flip);
  };
  const handlerChecked = e => {
    setChecked([...checked.map((c, j) => (j === i ? !showCheckbox : showCheckbox))]);
    setForm(e.target.id);
  };

  return (
    <ReactCardFlip
      isFlipped={flip}
      flipDirection="vertical">
      <Card
        onClick={handlerFlip}
        style={{ width: "130px", height: "130px" }}>
        <Card.Body
          style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
          }}
          className="d-flex flex-column justify-content-end"></Card.Body>
      </Card>

      <Card style={{ width: "130px", height: "130px" }}>
        <Card.Body className="d-flex flex-column justify-content-end">
          <p
            className=""
            style={{}}>
            {type}
          </p>
          <Row>
            <Col className="d-flex justify-content-between">
              {checked[i] ? (
                <FaRegCheckSquare
                  id={serverEnum}
                  className="fs-4"
                />
              ) : (
                <FaRegSquare
                  id={serverEnum}
                  className="fs-4"
                  onClick={handlerChecked}
                />
              )}
              <HiArrowPathRoundedSquare
                className="fs-4"
                onClick={handlerFlip}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </ReactCardFlip>
  );
};
export default FlipCard;
