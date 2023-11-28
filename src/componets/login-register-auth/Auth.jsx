import { useDispatch, useSelector } from "react-redux";
import { addRole, addUser } from "../../redux/actions";
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
      console.log(user);
      dispatch(addUser(user));
      if (user.role === "CUSTOMER") {
        navigate("/profile_customer");
      }
      if (user.role === "OWNER") {
        navigate("/profile_owner");
      }
    } else {
      //componente per errori
    }
  };
  useEffect(() => {
    fetchAuth();
  }, []);

  return <></>;
};
export default Auth;
