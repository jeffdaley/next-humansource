"use client";

import Avatar from "@/app/_components/avatar";
import { EMPLOYEES } from "@/app/lib/data";
import { DepartmentName } from "@/app/types/employees";
import Link from "next/link";

export interface Employee {
  id: string;
  name: string;
  email: string;
  imageURL?: string;
  department?: DepartmentName;
  reportsDirectlyTo?: string;
  directReports?: string[];
  annualSalary: number;
  startDate: number;
}

export default function EmployeesEmployeePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  /**
   * The employee record, found by its id.
   * TODO: Implement with Next.js fetching, caching, etc.
   */
  const employee = EMPLOYEES.find((e) => e.id === params.id);

  // TODO: Design "not found" state
  if (!employee) {
    return (
      <div>
        <h1>Employee not found</h1>
      </div>
    );
  }

  return (
    <>
      {/* TODO: Make editable if privileged  */}
      <Avatar employee={employee} />
      <h1>{employee.name}</h1>
      <p>{employee.email}</p>
      <hr></hr>
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
      <p>{employee.startDate}</p>
      <p>Salary: {employee.annualSalary} per year</p>
    </>
  );
}
