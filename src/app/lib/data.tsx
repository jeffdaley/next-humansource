"use client";

import { Employee } from "../employees/[id]/page";
import { DepartmentName } from "../types/employees";

export const EMPLOYEES: Employee[] = [
  {
    id: "1",
    name: "Foo Bar",
    email: "foo@bar.com",
    department: DepartmentName.Engineering,
    reportsDirectlyTo: "2",
    annualSalary: 100000,
    startDate: 1500000000,
  },
  {
    id: "2",
    imageURL: "https://placehold.co/400",
    name: "Baz Baz",
    email: "baz@baz.com",
    department: DepartmentName.Marketing,
    directReports: ["1"],
    annualSalary: 100000,
    startDate: 1000000000,
  },
  {
    id: "3",
    imageURL: "https://placehold.co/400",
    name: "Qux Qux",
    email: "qux@qux.com",
    department: DepartmentName.Sales,
    annualSalary: 100000,
    startDate: 2000000000,
  },
];

export const DEPARTMENTS = [
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
