import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addRole, addToken, addUser, addVehicle } from "../../redux/actions";
import { useNavigate } from "react-router";

const OutGone = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(addUser(null));
    dispatch(addRole(""));
    dispatch(addToken(""));
    dispatch(addVehicle(null));
    navigate("/");
  };
  useEffect(() => {
    logout();
  }, []);
  return (
    <>
      <></>
    </>
  );
};
export default OutGone;
