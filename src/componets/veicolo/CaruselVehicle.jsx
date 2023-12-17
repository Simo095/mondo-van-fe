import { useState } from "react";
import { Carousel } from "react-bootstrap";

import { FaRegPenToSquare } from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi2";

import { useNavigate } from "react-router";
import ModaleAddCoverVehicle from "./ModaleAddCoverVehicle";

const CaruselVehicle = ({ cover, token, height, vehicle }) => {
  const [show, setShow] = useState(false);

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

  return (
    <>
      <ModaleAddCoverVehicle
        show={show}
        handleClose={handleClose}
        token={token}
      />
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
