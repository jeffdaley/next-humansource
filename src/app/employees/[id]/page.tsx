"use client";

import { EMPLOYEES } from "@/app/lib/data";
import { DepartmentName } from "@/app/types/employees";
import Link from "next/link";

export interface Employee {
  id: string;
  name: string;
  email: string;
  department?: DepartmentName;
  reportsTo?: string;
  directReports?: string[];
  annualSalary: number;
  startDate: string;
}

export default function EmployeesEmployeePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const employee = EMPLOYEES.find((e) => e.id === params.id);

  if (!employee) {
    return (
      <div>
        <h1>Employee not found</h1>
      </div>
    );
  }

  return (
    <>
      <h1>
        {employee.id}: {employee.name}
      </h1>
      <Link
        href={{
          pathname: "/employees",
          query: {
            department: employee.department,
          },
        }}
      >
        {employee.department}
      </Link>
      <p>{employee.email}</p>
      <p>{employee.startDate}</p>
      <p>Salary: {employee.annualSalary} per year</p>
    </>
  );
}
