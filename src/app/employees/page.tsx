"use client";

import Link from "next/link";
import { DEPARTMENTS, EMPLOYEES } from "../lib/data";
import { DepartmentName } from "../types/employees";
import Avatar from "../_components/avatar";
import { SortOrder } from "../types/sorting";

export default function EmployeesPage({
  searchParams,
}: {
  searchParams: {
    department: DepartmentName | undefined;
    sort?: SortOrder;
  };
}) {
  const activeFilter = searchParams.department;

  const employees = activeFilter
    ? EMPLOYEES.filter((employee) => employee.department === activeFilter)
    : EMPLOYEES;

  const sort = searchParams.sort || SortOrder.Descending;

  const sortedEmployees = employees.sort((a, b) => {
    switch (sort) {
      case SortOrder.Descending:
        return b.startDate - a.startDate;
      case SortOrder.Ascending:
        return a.startDate - b.startDate;
    }
  });

  return (
    <>
      <h1>Employees</h1>
      <hr></hr>

      <div className="flex justify-between">
        {/* Filters */}
        <ul className="flex gap-1">
          <li>
            <Link
              className={
                "py-8 block " +
                (activeFilter === undefined ? "text-yellow-400" : "")
              }
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
                  "py-8 block " +
                  (activeFilter === department.name ? "text-yellow-400" : "")
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
        <Link
          href={{
            pathname: "/employees",
            query:
              sort === SortOrder.Descending
                ? { sort: SortOrder.Ascending }
                : {},
          }}
        >
          {/* TODO: Improve label */}
          Sorted by recently hired
        </Link>
      </div>

      {/* Employees */}
      <ol>
        {sortedEmployees.map((employee) => (
          <li key={employee.id} className="relative">
            <Link href={`/employees/${employee.id}`}>
              <Avatar employee={employee} />
              <h4>{employee.name}</h4>
              <p>
                {employee.email} | {employee.department} | Started{" "}
                {employee.startDate}
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
