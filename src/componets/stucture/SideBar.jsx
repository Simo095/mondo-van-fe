import { Button, Container, Image, Offcanvas } from "react-bootstrap";

import { FiLogOut } from "react-icons/fi";
import { IoNotificationsSharp, IoSettingsSharp } from "react-icons/io5";
import { FaRegPenToSquare } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchDisponibilita, fetchNotifiche } from "../../redux/actions/fetchActions";

import "../../assets/style/sidebar-button.css";
import "../../assets/style/card-notifica.css";
import ModaleAvatar from "../profile-page/ModaleAvatar";
import Calendario from "./Calendario";

import Notifica from "../profile-page/Notifica";

const SideBar = () => {
  const user = useSelector(state => state.login.user);
  const token = useSelector(state => state.login.token);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [notifiche, setNotifiche] = useState(null);
  const [showNotifiche, setShowNotifiche] = useState(false);
  const handleCloseNotifiche = () => setShowNotifiche(false);
  const handleShowNotifiche = () => {
    console.log("notifiche");
    console.log(notifiche);
    setShowNotifiche(true);
  };

  useEffect(() => {
    if (user.role === "OWNER") {
      dispatch(fetchDisponibilita(token));
    }
    dispatch(fetchNotifiche(token, setNotifiche));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="SideBar">
        <ModaleAvatar
          show={show}
          setShow={setShow}
        />

        <Offcanvas
          show={showNotifiche}
          onHide={handleCloseNotifiche}
          placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Notifiche</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {notifiche &&
              notifiche.map(elem => (
                <Notifica
                  elem={elem}
                  key={elem.id}
                  setNotifiche={setNotifiche}
                />
              ))}
          </Offcanvas.Body>
        </Offcanvas>

        {user && (
          <Container
            fluid
            className="main">
            <h2 className="text-center me-3 text-white">VAN WORLD</h2>
            <div className="up">
              <Button
                href={user.role === "OWNER" ? "/profile_owner" : user.role === "CUSTOMER" ? "profile_customer" : ""}
                className="card1 d-flex p-0 justify-content-end">
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
                <Image
                  src={user.avatar}
                  className="p-0 m-0 ImgCard"
                />
              </Button>
              <Button className="card2 d-flex text-black align-items-end pb-3">
                <IoSettingsSharp
                  color="black"
                  fontSize={40}
                />
                Account
              </Button>
            </div>
            <div className="down">
              {notifiche && notifiche.find(elem => elem.state === "READ") ? (
                <Button
                  onClick={notifiche && handleShowNotifiche}
                  className="card3 text-black d-flex align-items-start justify-content-end">
                  <IoNotificationsSharp fontSize={40} />
                  Notifiche
                </Button>
              ) : (
                <Button
                  onClick={notifiche && handleShowNotifiche}
                  className="card3 text-black d-flex align-items-start justify-content-end">
                  <div className="d-flex relative">
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "red",
                        position: "relative",
                        top: "4px",
                        left: "35px"
                      }}></div>
                    <IoNotificationsSharp fontSize={40} />
                    Notifiche
                  </div>
                </Button>
              )}

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
            {user.role === "OWNER" && (
              <div className="my-3">
                <h5 className="text-white">Le tue disponibilità</h5>
                <Calendario />
              </div>
            )}
          </Container>
        )}
      </div>
    </>
  );
};
export default SideBar;
