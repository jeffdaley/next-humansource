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
  pronunciation?: string;
  pronouns?: string;
  jobTitle: string;
  phone: string;
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
      <div className="overflow-hidden">
        <Avatar employee={employee} className="w-80 h-80 float-right" />
        <h1 className="text-[120px] mb-10">{employee.name}</h1>
        <p>{employee.jobTitle}</p>
        <p>{employee.email}</p>
        <p>{employee.phone}</p>
      </div>
      <Link
        href={{
          pathname: "/employees",
          query: {
            department: employee.department,
          },
        }}
        className="rounded-full px-3 py-1 bg-red-200"
      >
        {employee.department}
      </Link>
      <hr className="py-80"></hr>
      <p className="py-12">
        Start date: {employee.startDate} (2 years, 1 month, 1 day)
      </p>
      <p className="py-12">Salary: {employee.annualSalary} per year</p>
    </>
  );
}
