import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import CurrUserContext from "../CurrUserContext/CurrUserContext";
import SignupForm from "../SignupForm/SignupForm";
import LoginForm from "../LoginForm/LoginForm";
import CompanyList from "@/components/CompanyList/CompanyList";
import CompanyDetail from "@/components/CompanyDetail/CompanyDetail";
import JobList from "../JobList/JobList";
import JobDetail from "../JobDetail/JobDetail";
import Logout from "../Logout/Logout";
import Homepage from "../Homepage/Homepage";
import ProfileForm from "../ProfileForm/ProfileForm";

function AppRoutes() {

  const {user} = useContext(CurrUserContext);

  const renderRoutesByAuthentication = () => {
    if (user) {
      return (
        <>
          <Route path="/" element={<Homepage />} />
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/:handle" element={<CompanyDetail />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/profile" element={<ProfileForm />} />
          <Route path="/logout" element={<Logout />} />        
        </>
      );
    } else {
      return (
        <>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </>
      )
    }
  }

  return (
    <Routes>
      {renderRoutesByAuthentication()}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
