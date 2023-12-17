import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchVehicle } from "../../redux/actions/fetchActions";

const ChangeVehicle = () => {
  const token = useSelector(state => state.login.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVehicle(token));
    navigate("/profile_owner");
  }, []);
  return <></>;
};
export default ChangeVehicle;
