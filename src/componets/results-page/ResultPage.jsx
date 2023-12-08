import { useEffect } from "react";
import { useSelector } from "react-redux";

const ResultPage = () => {
  const user = useSelector(state => state.login.user);
  const token = useSelector(state => state.login.token);
  const results = useSelector(state => state.result.vehicles);
  useEffect(() => {
    console.log(results);
  }, []);
  return (
    <>
      <></>
    </>
  );
};
export default ResultPage;
