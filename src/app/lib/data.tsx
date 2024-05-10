"use client";

import { Employee } from "../employees/[id]/page";
import { DepartmentName } from "../types/employees";

export const USER_ID = "1";

export const EMPLOYEES: Employee[] = [
  {
    id: "1",
    name: "Zaynib Ghadiyali",
    pronouns: "She/Her",
    imageURL: "employee-1.jpg",
    address: {
      street: "2777 W 34th St",
      city: "New York",
      state: "NY",
      zipCode: "10024",
      country: "United States",
    },
    email: "zay@tabbyml.com",
    phone: "+1 203-666-4133",
    jobTitle: "Engineer II",
    department: DepartmentName.Engineering,
    reportsDirectlyTo: "2",
    annualSalary: 100000,
    startDate: 1707606201,
  },
  {
    id: "2",
    name: "Gage Salzano",
    imageURL: "employee-2.jpg",
    address: {
      street: "1000 W 12th St",
      city: "New York",
      state: "NY",
      zipCode: "10024",
      country: "United States",
    },
    email: "gage@tabbyml.com",
    phone: "+1 733-882-1299",
    jobTitle: "Sr. Project Manager",
    department: DepartmentName.Marketing,
    directReports: ["1"],
    annualSalary: 100000,
    startDate: 1707606201,
  },
  {
    id: "3",
    name: "Craig Shimala",
    imageURL: "employee-3.jpg",
    address: {
      street: "1000 W 12th St",
      city: "New York",
      state: "NY",
      zipCode: "10024",
      country: "United States",
    },
    email: "craig@tabbyml.com",
    phone: "+1 617-568-3122",
    jobTitle: "Director of Sales",
    department: DepartmentName.Sales,
    annualSalary: 100000,
    startDate: 2000000000,
  },
];

export const DEPARTMENTS = [
  {
    id: "0",
    name: DepartmentName.All,
  },
  {
    id: "1",
    name: DepartmentName.Engineering,
  },
  {
    id: "2",
    name: DepartmentName.Marketing,
  },
  {
    id: "3",
    name: DepartmentName.Sales,
  },
];
