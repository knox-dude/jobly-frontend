import { useEffect, useState } from "react";
import { JoblyApi } from "@/api";
import { Company } from "@/types";
import CompanyCard from "@/components/CompanyCard/CompanyCard";
import SearchBox from "@/components/SearchBox/SearchBox";

function CompanyList() {
  const [companies, setCompanies] = useState<Company[]>([]);
  // need this to know if loading or not
  const [loading, setLoading] = useState<boolean>(true);

  // get a list of all companies on page load
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await JoblyApi.getCompanies();
        setCompanies(response);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  // handle when user searches for a company
  const handleSearch = async (searchText: string | undefined) => {
    try {
      searchText = searchText || undefined;
      const response = await JoblyApi.searchCompanies(searchText);
      setCompanies(response);
    } catch (error) {
      console.error("Error searching companies:", error);
    }
  };

  // renders companies or message when there are no companies
  const renderCompanies = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (companies.length === 0) {
      return <h4 className="text-center pt-4">Couldn't find any companies</h4>
    }
    return companies.map((company) => {
      return (
        <CompanyCard key={company.handle} {...company}></CompanyCard>
      );
    });
  };

  return (
    <div className="company-list container pt-1">
      <SearchBox handleSearch={handleSearch} />
      {renderCompanies()}
    </div>
  )

}

export default CompanyList;