import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetLogin, resetPost, resetResult, resetVehicle } from "../../redux/actions";
import { useNavigate } from "react-router";
const OutGone = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resetAndRedirect = () => {
    dispatch(resetLogin());
    dispatch(resetPost());
    dispatch(resetResult());
    dispatch(resetVehicle());
    navigate("/");
  };

  useEffect(() => {
    resetAndRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <></>
    </>
  );
};
export default OutGone;
