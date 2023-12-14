import { useDispatch, useSelector } from "react-redux";
import { addUser, addVehicle, fetchPost } from "../../redux/actions";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.login.token);

  const fetchAuth = async () => {
    const respSucces = await fetch("http://localhost:8080/users/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    });
    if (respSucces.ok) {
      const user = await respSucces.json();
      dispatch(addUser(user));
      if (user.role === "CUSTOMER") {
        navigate("/profile_customer");
      }
      if (user.role === "OWNER") {
        const objVehicle = await fetch("http://localhost:8080/vehicles/my_vehicle", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        });
        if (objVehicle.ok) {
          const vehicle = await objVehicle.json();
          if (vehicle != null) {
            dispatch(addVehicle(vehicle));
          }
        }
        navigate("/profile_owner");
      }
    }
  };

  useEffect(() => {
    fetchAuth();
    dispatch(fetchPost(token));
  }, []);

  return <></>;
};
export default Auth;
