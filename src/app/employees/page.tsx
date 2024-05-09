"use client";

import Link from "next/link";
import Action from "../_components/action";
import { Employee } from "./[id]/page";
import { useState } from "react";

export enum DepartmentName {
  Engineering = "Engineering",
  Marketing = "Marketing",
  Sales = "Sales",
}

// TODO: Move to a data folder?
export const employees: Employee[] = [
  {
    id: "1",
    name: "Foo Bar",
    email: "foo@bar.com",
    department: DepartmentName.Engineering,
  },
  {
    id: "2",
    name: "Baz Baz",
    email: "baz@baz.com",
    department: DepartmentName.Marketing,
  },
  {
    id: "3",
    name: "Qux Qux",
    email: "qux@qux.com",
    department: DepartmentName.Sales,
  },
];

export const departments = [
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

export default function EmployeesPage({
  params,
}: {
  params: {
    department: DepartmentName | undefined;
  };
}) {
  debugger;

  const [departmentFilter] = useState<DepartmentName | undefined>();

  const activeFilter = departmentFilter || params.department;

  const employeesToShow = departmentFilter
    ? employees.filter((employee) => employee.department === activeFilter)
    : employees;

  return (
    <>
      <Action className="text-red-400">New Employee</Action>
      <h1>Employees</h1>

      {/* Filters */}
      <div className="flex gap-2">
        <ul className="flex gap-1">
          <li>
            <Link href="/employees">All</Link>
          </li>
          {departments.map((department) => (
            <li key={department.id}>
              {/* TODO: make these Links that update the param */}
              <Link
                href={{
                  pathname: "/employees",
                  query: {
                    department: department.name
                      .toLowerCase()
                      .replace(/\s+/g, "-"),
                  },
                }}
              >
                {department.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Employees */}
      <ol>
        {employeesToShow.map((employee) => (
          <li key={employee.id} className="relative">
            <Link href={`/employees/${employee.id}`}>
              <h4>{employee.name}</h4>
              <p>
                {employee.email} | {employee.department}
              </p>
            </Link>
            {/* Absolutely positioned overflow menu */}
            <div className="bg-red-400 absolute right-0 top-0">
              Overflow menu
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
