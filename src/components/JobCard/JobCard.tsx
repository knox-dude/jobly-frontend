import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap"
import { Job } from "@/types";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CurrUserContext from "../CurrUserContext/CurrUserContext";
import { JoblyApi } from "@/api";

// renders a JobCard, which is displayed on CompanyDetail page and JobList page
function JobCard({id, title, salary, equity}: Job) {

  const {user} = useContext(CurrUserContext);
  const [applied, setApplied] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      return;
    }
    setApplied(user.applications.some((application) => application == id));
  }, [user, id])

  // add application to user's jobs and set state
  const applyToJob = async (id: string) => {
    if (!user) {
      return;
    }
    try {
      await JoblyApi.applyToJob(user.username, id);
      setApplied(true);
    } catch (err) {
      console.error(`Problem applying to job: ${err}`);
      return;
    }
  }

  const renderAppliedStatus = () => {
    if (!user) {
      return null;
    }
    if (applied) {
      return (
        <Button style={{cursor:"default"}} className="text-success m-5 h-50 bg-light">Applied!</Button>
      );
    } else {
      return (
        <Button onClick={() => applyToJob(id)} className="text-primary m-5 h-50 bg-light">Apply</Button>
      );
    }
  }

  const navigate = useNavigate();

  return (
    <Card className="job-card flex-row m-2">
      <CardBody onClick={() => navigate(`/jobs/${id}`)} style={{cursor:"pointer"}} className="job-card-body">
        <CardTitle tag="h6">{title}</CardTitle>
        <CardText>Salary: {salary}<br></br>Equity: {equity}</CardText>
      </CardBody>
      {renderAppliedStatus()}
    </Card>
  );
}



export default JobCard;