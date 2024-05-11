"use client";

import Action from "@/app/_components/action";
import Avatar from "@/app/_components/avatar";
import { Headline } from "@/app/_components/headline";
import { parseDate, timeAgo } from "@/app/_utils/date";
import { EMPLOYEES, USER_ID } from "@/app/lib/data";
import { DepartmentName } from "@/app/types/employees";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface Employee {
  id: string;
  name: string;
  workEmail: string;
  personalEmail: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }; // unused
  jobTitle: string;
  phone: string;
  annualSalary: number;
  startDate: number;
  imageURL?: string;
  birthday?: string; // unused
  department?: DepartmentName;
  pronunciation?: string; // unused
  pronouns?: string;
  reportsDirectlyTo?: string;
  directReports?: string[];
}

export default function EmployeesEmployeePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const isViewingSelf = params.id === USER_ID;

  const [employees, setEmployees] = useState(EMPLOYEES);

  /**
   * The employee record, found by its id.
   * TODO: Implement with Next.js fetching, caching, etc.
   */
  const [employee, setEmployeeInfo] = useState(
    employees.find((e) => e.id === params.id)
  );

  if (!employee) {
    throw new Error();
  }

  const directReports = employees.filter(
    (e) => e.reportsDirectlyTo === employee.id
  );

  const reportsDirectlyTo = employees.find(
    (e) => e.id === employee.reportsDirectlyTo
  );

  const [isEditing, setIsEditing] = useState(false);

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
      <div className="px-8 pt-12 pb-8">
        {/* TODO: Make editable if privileged  */}
        <div className="relative">
          {isEditing ? (
            <>
              {/* TODO: onSubmit action */}
              <form>
                <input
                  className="w-full bg-neutral-800 mb-10"
                  type="text"
                  value={employee.name}
                  // TODO: this needs to persist and overwrite the EMPLOYEES.
                  onChange={(e) => {
                    setEmployeeInfo({ ...employee, name: e.target.value });
                  }}
                />
              </form>
            </>
          ) : (
            <>
              <div className="w-[600px] h-[600px] absolute -top-24 -right-8">
                <div className="absolute left-0 top-0 w-full h-64 bg-gradient-to-b from-black to-black/0" />

                <Avatar
                  employee={employee}
                  className="w-full h-full rounded-none"
                />
                {isViewingSelf && (
                  <Action className="absolute bottom-0 translate-y-1/2 right-8 pill h-12 px-6 bg-neutral-800 border-2 border-black z-10  text-white">
                    Edit photo ▾
                  </Action>
                )}
              </div>
              <div className="relative flex flex-col items-start">
                <Headline>
                  <span className="pr-80">{employee.name}</span>
                </Headline>
                <p className="text-4xl mt-10 mb-2">{employee.jobTitle}</p>
                <div className="mb-8">
                  <a href={`mailto:${employee.workEmail}`}>
                    {employee.workEmail}
                  </a>
                  <p>{employee.phone}</p>
                </div>

                <Link
                  href={{
                    pathname: "/employees",
                    query: {
                      department: employee.department,
                    },
                  }}
                  className={`filter-button px-3 py-2 mb-16 ${employee.department
                    ?.toLowerCase()
                    .replace(/ /g, "-")}`}
                >
                  {employee.department}
                </Link>

                <p className="">
                  Hired {parseDate(employee.startDate)} (
                  {timeAgo(employee.startDate)})
                </p>
              </div>
            </>
          )}

          {isViewingSelf && (
            <div className="border border-neutral-800">
              <div>Private to you</div>
              <p className="">Personal email: {employee.personalEmail}</p>
              {/* TODO: add all other address info */}
              <p className="">Address: {employee.address.street}</p>
              <p className="">Salary: ${employee.annualSalary} per year</p>
              <Action
                className="bg-white text-black w-32 pill h-10"
                onClick={() => {
                  // Update the employees array with the new employee

                  // Find the record by the index of the USER_ID
                  const recordIndex = employees.findIndex(
                    (employee) => employee.id === USER_ID
                  );

                  employees[recordIndex] = employee;

                  setEmployees(employees);
                  setIsEditing(!isEditing);
                }}
              >
                {isEditing ? "Save" : "Edit"}
              </Action>
            </div>
            // How do I add a condition here?
          )}
        </div>
      </div>
      <div>
        {!!directReports.length && (
          <p className="py-12">
            Direct reports: {directReports.map((d) => d.name)}
          </p>
        )}
        {reportsDirectlyTo && (
          <p className="py-12">Manager: {reportsDirectlyTo.name}</p>
        )}
      </div>
    </>
  );
}
