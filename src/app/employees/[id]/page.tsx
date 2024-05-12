"use client";

import Action from "@/app/_components/action";
import Avatar from "@/app/_components/avatar";
import EmployeesEmployeePersonalInformation from "@/app/_components/employees/employee/personal-information";
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
  const [employee, setEmployee] = useState(
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
          <>
            <div className="w-[600px] h-[600px] absolute -top-24 -right-8">
              <div className="absolute left-0 top-0 w-full h-64 bg-gradient-to-b from-black to-black/0" />

              <Avatar
                employee={employee}
                className="w-full h-full rounded-none"
              />
              {isViewingSelf && (
                <Action className="absolute bottom-0 translate-y-1/2 right-8 pill h-12 px-6 bg-neutral-800 border-2 border-black  text-white">
                  Edit photo ▾
                </Action>
              )}
            </div>
            <div className="relative flex flex-col items-start">
              <Headline>
                {/* TODO: show a lock icon if the user is viewing themselves with a tooltip instructing them to contact HR to change it. We probably want to wrap the last name in a relatively positioned span with an interactive element positioned absolutely  */}
                <span className="pr-80">{employee.name}</span>
              </Headline>
              <p className="text-5xl mt-10 mb-2">{employee.jobTitle}</p>
              <div className="mb-8">
                <a href={`mailto:${employee.workEmail}`}>
                  {employee.workEmail}
                </a>
              </div>

              <Link
                href={{
                  pathname: "/employees",
                  query: {
                    department: employee.department,
                  },
                }}
                className={`filter-button active px-3 py-2 mb-16 ${employee.department
                  ?.toLowerCase()
                  .replace(/ /g, "-")}`}
              >
                {employee.department}
              </Link>

              <p className="">
                Join date: {parseDate(employee.startDate)} (
                {timeAgo(employee.startDate)})
              </p>
              {isViewingSelf && (
                <p className="">Salary: ${employee.annualSalary} per year</p>
              )}
            </div>
            <div className="flex gap-16">
              {reportsDirectlyTo && (
                <div className="py-12">
                  <h5 className="uppercase font-semibold mb-4">Manager</h5>
                  <Link href={`/employees/${reportsDirectlyTo.id}`}>
                    <Avatar employee={reportsDirectlyTo} />
                    {reportsDirectlyTo.name}
                  </Link>
                </div>
              )}
              {!!directReports.length && (
                <p className="py-12">
                  <h5 className="uppercase font-semibold mb-4">
                    Direct reports
                  </h5>
                  {directReports.map((d) => {
                    return (
                      <Link key={d.id} href={`/employees/${d.id}`}>
                        <Avatar employee={d} />
                        {d.name}
                      </Link>
                    );
                  })}
                </p>
              )}
            </div>
          </>

          {isViewingSelf && (
            <>
              <EmployeesEmployeePersonalInformation
                employee={employee}
                onSave={setEmployee}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
