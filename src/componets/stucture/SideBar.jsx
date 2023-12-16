import { Button, Container, Form, Modal, Spinner } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { FiLogOut } from "react-icons/fi";
import { IoNotificationsSharp, IoSettingsSharp } from "react-icons/io5";
import { FaRegPenToSquare } from "react-icons/fa6";
import { RiArrowGoBackLine, RiSendPlaneFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDisponibilita, fetchUser } from "../../redux/actions/fetchActions";
import vanSide from "../../assets/icone/van-side.png";
import lente from "../../assets/icone/lente.png";
import blog from "../../assets/icone/Blog.png";
import "../../assets/style/sidebar-button.css";
import ModaleAvatar from "../profile-page/ModaleAvatar";
import Calendario from "./Calendario";

const SideBar = () => {
  const user = useSelector(state => state.login.user);
  const vehicle = useSelector(state => state.vehicles.vehicle);
  const token = useSelector(state => state.login.token);
  const [show, setShow] = useState(false);
  const [disponibilita, setDisponibilita] = useState(null);
  const [idDispo, setIdDispo] = useState(null);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (user.role === "OWNER") dispatch(fetchDisponibilita(token, setDisponibilita, setIdDispo));
  }, []);

  return (
    <>
      <div className="SideBar">
        <ModaleAvatar
          show={show}
          setShow={setShow}
        />
        {user && (
          <Container
            fluid
            className="main">
            <h2 className="text-center me-3">VAN WORLD</h2>
            <div className="up">
              <Button
                href={user.role === "OWNER" ? "/profile_owner" : user.role === "CUSTOMER" ? "profile_customer" : ""}
                style={{
                  backgroundImage: `url(${user.avatar})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover"
                }}
                className="card1 d-flex justify-content-end">
                {" "}
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
                    color: "black"
                  }}
                />
              </Button>
              <Button className="card2 d-flex text-black align-items-center">
                <IoSettingsSharp
                  color="black"
                  fontSize={40}
                />
                Account
              </Button>
            </div>
            <div className="down">
              <Button
                onClick={() => {
                  //MODALE MOSTRA NOTIFICHE
                }}
                className="card3 text-black d-flex align-items-start justify-content-end">
                <IoNotificationsSharp fontSize={40} />
                Notifiche
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
            {disponibilita && user.role === "OWNER" && (
              <div className="my-3">
                <h5>Le tue disponibilità</h5>
                <Calendario
                  array={disponibilita}
                  idDispo={idDispo}
                />
              </div>
            )}
          </Container>
        )}
      </div>
    </>
  );
};
export default SideBar;
