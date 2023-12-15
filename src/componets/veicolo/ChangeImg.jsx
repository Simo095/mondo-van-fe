import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addVehicle } from "../../redux/actions";

const ChangeImg = () => {
  const token = useSelector(state => state.login.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const vehicleFetch = async () => {
    const objVehicle = await fetch("http://localhost:8080/vehicles/my_vehicle", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    });
    if (objVehicle.ok) {
      const vehicle = await objVehicle.json();
      dispatch(addVehicle(vehicle));
      navigate("/profile_vehicle");
    }
  };
  useEffect(() => {
    vehicleFetch();
  }, []);
  return <></>;
};
export default ChangeImg;
