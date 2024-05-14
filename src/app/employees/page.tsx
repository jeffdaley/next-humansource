"use client";

import Link from "next/link";
import { DEPARTMENTS, EMPLOYEES } from "../lib/data";
import { DepartmentName } from "../types/employees";
import Avatar from "../_components/avatar";
import { SortOrder } from "../types/sorting";
import { parseDate } from "../_utils/date";
import { Headline } from "../_components/headline";

export default function EmployeesPage({
  searchParams,
}: {
  searchParams: {
    department?: DepartmentName;
    sort?: SortOrder;
  };
}) {
  const activeFilter = searchParams.department || DepartmentName.All;

  const employees =
    activeFilter === DepartmentName.All
      ? EMPLOYEES
      : EMPLOYEES.filter((employee) => employee.department === activeFilter);

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
    <div className="relative px-12 pt-12">
      <Headline>Employees</Headline>
      <p className="mb-5">
        This is an extremely unfinished sketch exploring queryParams.
      </p>
      <div className="flex w-full justify-between">
        {/* Filters */}
        <ul className="mb-12 flex">
          {DEPARTMENTS.map((department) => (
            <li key={department.id}>
              <Link
                className={`filter-button grid ${
                  activeFilter === department.name && "active"
                } ${department.name.toLowerCase().replace(/ /g, "-")}`}
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
            query: {
              ...searchParams,
              sort:
                sort === SortOrder.Descending ? SortOrder.Ascending : undefined,
            },
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
            <Link href={`/employees/${employee.id}`} className="flex">
              <Avatar
                employee={employee}
                className="h-12 w-12 overflow-hidden rounded-full"
              />
              <div>
                <h4 className="text-xl font-bold">{employee.name}</h4>
                <p className="text-neutral-500">
                  {employee.jobTitle}
                  {employee.workEmail} | {employee.department} | Started{" "}
                  {parseDate(employee.startDate)}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
