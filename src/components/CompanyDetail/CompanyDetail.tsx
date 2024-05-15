import { Company } from "@/types"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { JoblyApi } from "@/api";
import JobCard from "@/components/JobCard/JobCard";
import { Spinner } from "reactstrap";

function CompanyDetail() {

  const params = useParams();
  const handle = params.handle;

  if (!handle) {
    throw new Error("Invalid handle");
  }

  const [company, setCompany] = useState<Company>();

  // get job info on this company and set company state
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        console.log('API call in CompanyDetail - useEffect');
        const response = await JoblyApi.getCompany(handle);
        setCompany(response);
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    };
    fetchCompany();
  }, [handle]);

  const renderJobs = () => {
    if (!company || !company.jobs) {
      return <Spinner />;
    }
    return company?.jobs.map((job) => {
      return (
        <JobCard key={job.id} {...job}></JobCard>
      );
    });
  }

  return (
    <div className="company-detail container p-2 top-2">
      <h1 className="company-detail-header text-center mt-2">{company?.name}</h1>
      <h5 className="company-detail-description text-muted text-center m-2">{company?.description}</h5>
      <p className="company-detail-employees text-muted text-center">{company?.numEmployees} Employees</p>
      {renderJobs()}
    </div>
  )
}

export default CompanyDetail