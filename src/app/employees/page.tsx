"use client";

import Link from "next/link";
import Action from "../_components/action";
import { DEPARTMENTS, EMPLOYEES } from "../lib/data";
import { DepartmentName } from "../types/employees";

export default function EmployeesPage({
  searchParams,
}: {
  searchParams: {
    department: DepartmentName | undefined;
  };
}) {
  const activeFilter = searchParams.department;
  const employeesToShow = activeFilter
    ? EMPLOYEES.filter((employee) => employee.department === activeFilter)
    : EMPLOYEES;

  return (
    <>
      <Action className="text-red-400">New Employee</Action>
      <h1>Employees</h1>

      {/* Filters */}
      <div className="flex gap-2">
        <ul className="flex gap-1">
          <li>
            <Link
              className={activeFilter === undefined ? "text-yellow-400" : ""}
              href={{
                pathname: "/employees",
                query: undefined,
              }}
            >
              All
            </Link>
          </li>
          {DEPARTMENTS.map((department) => (
            <li key={department.id}>
              <Link
                className={
                  activeFilter === department.name ? "text-yellow-400" : ""
                }
                href={{
                  pathname: "/employees",
                  query: {
                    department: encodeURIComponent(department.name),
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
