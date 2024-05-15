import { Job } from "@/types"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { JoblyApi } from "@/api";
import CompanyCard from "@/components/CompanyCard/CompanyCard";
import { Spinner } from "reactstrap";

// JobDetail component, found by clicking on JobCard component
function JobDetail() {

  const params = useParams();
  const id = params.id;

  // need this because typescript thinks id could be undefined, component won't work if we don't have this
  if (!id) { 
    throw new Error("Invalid id - shoudln't reach here");
  }

  const [job, setJob] = useState<Job>();

  // get job info and set it. job info includes info on the company
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await JoblyApi.getJob(id);
        setJob(response);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    fetchJob();
  }, [id]);

  const renderCompanyCard = () => {
    if (!job || !job.company) {
      return <Spinner />;
    }
    return <CompanyCard {...job.company}/>;
  }

  const renderSalaryAndEquity = () => {
    if (!job) {
      return <Spinner />;
    }
    const salary = !job.salary ? "Unavailable" : job.salary;
    const equity = !job.equity? "Unavailable" : job.equity;
    return (
      <div className="row text-center text-muted pt-2 m-2">
        <div className="col-6">
          <h5 className="mb-0">Salary: ${salary}</h5>
        </div>
        <div className="col-6 ">
          <h5 className="mb-0">Equity: {equity}</h5>
        </div>
      </div>
    );
  }

  return (
    <div className="job-detail container p-2 top-2">
      <h1 className="job-detail-title text-center mt-2">{job?.title}</h1>
      {renderSalaryAndEquity()}
      <hr className="solid"/>
      <h4 className="job-detail-company text-center m-2">Associated Company:</h4>
      {renderCompanyCard()}
    </div>
  )
}

export default JobDetail