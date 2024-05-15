import { render, screen } from "@testing-library/react";
import CompanyCard from "@/components/CompanyCard/CompanyCard";
import { Company } from "@/types";
import { BrowserRouter } from "react-router-dom";

const mockCompany: Company = {
  handle: "test-handle",
  name: "Test Company",
  description: "This is a test company.",
  numEmployees: 100,
  logoUrl: "https://example.com/logo.png",
};

describe("CompanyCard", () => {

  it("passes the snapshot test", () => {
    const {asFragment} = render(
      <BrowserRouter>
        <CompanyCard {...mockCompany} />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders and displays the company name", () => {
    render(
      <BrowserRouter>
        <CompanyCard {...mockCompany} />
      </BrowserRouter>
    );
    const companyName = screen.getByText(mockCompany.name);
    expect(companyName).toBeInTheDocument();
  });

  it("renders the company description", () => {
    render(
      <BrowserRouter>
        <CompanyCard {...mockCompany} />
      </BrowserRouter>
    );
    const companyDescription = screen.getByText(mockCompany.description);
    expect(companyDescription).toBeInTheDocument();
  });

  it("renders the number of employees", () => {
    render(
      <BrowserRouter>
        <CompanyCard {...mockCompany} />
      </BrowserRouter>
    );
    const employeesCount = screen.getByText(
      `Employees: ${mockCompany.numEmployees}`
    );
    expect(employeesCount).toBeInTheDocument();
  });
});
