import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMyPosts, addPosts, addResult, addRole, addToken, addUser, addVehicle, logged } from "../../redux/actions";
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
    dispatch(addMyPosts([]));
    dispatch(addResult([]));
    navigate("/");
  };
  useEffect(() => {
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <></>
    </>
  );
};
export default OutGone;
