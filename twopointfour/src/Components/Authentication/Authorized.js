import { useEffect } from "react";
import { useHistory } from "react-router";

const Authorized = () => {
  const history = useHistory();
  useEffect(() => {
    console.log(history);
  }, []);
  return <div></div>;
};

export default Authorized;
