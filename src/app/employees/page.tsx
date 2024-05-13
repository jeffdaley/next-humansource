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
  // FIXME: Don't ever want the "All" param showing in the URL
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
    <div className="relative px-8 pt-12">
      <Headline>Employees</Headline>
      <div className="flex w-full justify-between">
        {/* Filters */}
        <ul className="mb-12 flex gap-1">
          {DEPARTMENTS.map((department) => (
            <li key={department.id}>
              <Link
                className={`filter-button pill grid h-10 place-items-center px-6 ${
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
                className="h-20 w-20 overflow-hidden rounded-full"
              />
              <div>
                <h4 className="text-3xl font-bold">{employee.name}</h4>
                <p>
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
