import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import CurrUserContext from "../CurrUserContext/CurrUserContext";

function Logout() {
  const navigate = useNavigate();
  const {logout} = useContext(CurrUserContext);

  useEffect(() => {
    logout();
    navigate("/");
  });

  return (
    <Spinner color="primary" />
  )
}

export default Logout