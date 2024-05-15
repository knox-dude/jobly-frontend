import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap"
import { Company } from "@/types";
import { useNavigate } from "react-router-dom";


function CompanyCard({handle, name, description, numEmployees, logoUrl}: Company) {

  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/companies/${handle}`)} style={{cursor:"pointer"}} className="company-card flex-row m-2">
      <CardBody className="col-10">
        <div className="h-100 d-flex flex-column justify-content-between">
          <div>
            <CardTitle tag="h5">{name}</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">{description}</CardSubtitle>
          </div>
          <CardText>Employees: {numEmployees}</CardText>
        </div>

      </CardBody>

      <div className="container col-2 p-2">
        <img className="img-fluid" src={logoUrl} alt={name} />
      </div>
    </Card>
  )
}


export default CompanyCard;
