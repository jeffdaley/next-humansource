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
    <>
      <h1 className="text-[120px] mb-10">Employees</h1>
      <div className="flex">
        <div className="flex justify-between">
          {/* Filters */}
          <ul className="flex gap-1">
            {DEPARTMENTS.map((department) => (
              <li key={department.id}>
                <Link
                  className={
                    "py-2 block px-2 border border-gray-700 " +
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
        </div>
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
            <Link href={`/employees/${employee.id}`}>
              <Avatar employee={employee} />
              <h4>{employee.name}</h4>
              <p>
                {employee.email} | {employee.department} | Started{" "}
                {employee.startDate}
              </p>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
