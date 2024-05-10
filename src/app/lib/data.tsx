"use client";

import { Employee } from "../employees/[id]/page";
import { DepartmentName } from "../types/employees";

export const EMPLOYEES: Employee[] = [
  {
    id: "1",
    name: "Lauren DeBlanc",
    pronouns: "She/Her",
    email: "lauren@tabbyml.com",
    phone: "+1 203-666-4133",
    jobTitle: "Engineer II",
    department: DepartmentName.Engineering,
    reportsDirectlyTo: "2",
    annualSalary: 100000,
    startDate: 1500000000,
  },
  {
    id: "2",
    imageURL: "https://placehold.co/400",
    name: "Renata Southland",
    email: "renata@tabbyml.com",
    phone: "+1 733-882-1299",
    jobTitle: "Sr. Project Manager",
    department: DepartmentName.Marketing,
    directReports: ["1"],
    annualSalary: 100000,
    startDate: 1000000000,
  },
  {
    id: "3",
    imageURL: "https://placehold.co/400",
    name: "Srini Navasara",
    pronunciation: "shree-nee na-va-sa-ra",
    email: "srini@tabbyml.com",
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
