import { useNavigate } from "react-router";
import { addUser, addVehicle } from ".";

export const fetchUser = token => {
  return async dispatch => {
    const navigate = useNavigate();
    try {
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
          navigate("/profile_owner");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchVehicle = token => {
  return async dispatch => {
    try {
      const objVehicle = await fetch("http://localhost:8080/vehicles/my_vehicle", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (objVehicle.ok) {
        const vehicle = await objVehicle.json();
        dispatch(addVehicle(vehicle));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
