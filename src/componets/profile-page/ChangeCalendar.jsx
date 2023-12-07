import { useEffect } from "react";
import { useNavigate } from "react-router";

const ChangeCalendar = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/profile_owner");
  }, []);
  return <></>;
};
export default ChangeCalendar;
