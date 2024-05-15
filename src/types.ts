export interface Company {
  handle: string;
  name: string;
  description: string;
  numEmployees?: number;
  logoUrl?: string;
  jobs?: Job[];
}

export interface Job {
  id: string;
  title: string;
  salary?: number;
  equity?: number;
  companyHandle?: string;
  companyName?: string;
  company?: Company;
}

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  applications: string[];
}
