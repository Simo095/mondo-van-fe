import { useEffect } from "react";
import { useNavigate } from "react-router";

const ChangeCalendar = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/profile_owner");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};
export default ChangeCalendar;
