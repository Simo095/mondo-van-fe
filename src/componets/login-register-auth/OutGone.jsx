import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPosts, addResult, addRole, addToken, addUser, addVehicle, logged } from "../../redux/actions";
import { useNavigate } from "react-router";

const OutGone = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(addUser(null));
    dispatch(addRole(""));
    dispatch(addToken(""));
    dispatch(addVehicle(null));
    dispatch(logged(false));
    dispatch(addPosts([]));
    dispatch(logged(false));
    dispatch(addResult([]));

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
