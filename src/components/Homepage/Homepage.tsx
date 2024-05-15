import { useContext } from "react";
import CurrUserContext from "../CurrUserContext/CurrUserContext";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./Homepage.css"


function Homepage() {

  const navigate = useNavigate();

  // get user from context provider
  const {user} = useContext(CurrUserContext);

  const renderBasedOnUser = () => {
    if (user) {
      return (
        <>
          <h3>Welcome back, {user.firstName}!</h3>
        </>
      )
    } else {
      return (
        <div className="container d-flex align-items-center justify-content-center">
          <Button className="m-2" onClick={() => navigate("/login")}>Login</Button>
          <Button className="m-2" onClick={() => navigate("/signup")}>Sign Up</Button>
        </div>
      )
    }
  }

  return (
    <div className="homepage d-flex flex-column justify-content-center align-items-center">
      <h1 className="py-2">Jobly</h1>
      <h4 className="py-2">All the jobs, in one convenient place.</h4>
      {renderBasedOnUser()}
    </div>
  )
}

export default Homepage