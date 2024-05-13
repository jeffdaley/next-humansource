"use client";

import Action from "@/app/_components/action";
import Avatar from "@/app/_components/avatar";
import PersonalEmail from "@/app/_components/employees/employee/personal-email";
import PersonalInformation from "@/app/_components/employees/employee/personal-information";
import Phone from "@/app/_components/employees/employee/phone";
import Salary from "@/app/_components/employees/employee/salary";
import Thumbnail from "@/app/_components/employees/employee/thumbnail";
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
  }; // unused
  jobTitle: string;
  phone: string;
  annualSalary: number;
  startDate: number;
  imageURL?: string;
  birthday?: string; // unused
  department: DepartmentName;
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
    employees.find((e) => e.id === params.id),
  );

  if (!employee) {
    throw new Error();
  }

  const directReports = employees.filter(
    (e) => e.reportsDirectlyTo === employee.id,
  );

  const reportsDirectlyTo = employees.find(
    (e) => e.id === employee.reportsDirectlyTo,
  );

  const dasherizedDepartment = employee.department
    .toLowerCase()
    .replace(/ /g, "-");

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
      <div className="px-8 pb-8 pt-12">
        <div className="relative">
          <>
            <div className="absolute -right-8 -top-24 h-[600px] w-[600px]">
              <div className="absolute left-0 top-0 h-64 w-full bg-gradient-to-b from-black to-black/0" />

              <Avatar
                employee={employee}
                className="h-full w-full rounded-none"
              />

              {isViewingSelf && (
                <div className="absolute bottom-0 right-8 translate-y-1/2">
                  <Action className="pill  h-12   bg-white px-6 text-black">
                    Edit photo <span className="ml-1">▾</span>
                  </Action>
                </div>
              )}
            </div>
            <div className="relative flex min-h-[504px]  flex-col justify-between ">
              <div className="mb-16">
                <Headline>
                  {/* TODO: show a lock icon if the user is viewing themselves with a tooltip instructing them to contact HR to change it. We probably want to wrap the last name in a relatively positioned span with an interactive element positioned absolutely  */}
                  <span className="pr-80">{employee.name}</span>
                </Headline>
                <p className="mb-2 mt-10 text-5xl font-light">
                  {employee.jobTitle}
                </p>
                <div className="mb-8">
                  <a
                    href={`mailto:${employee.workEmail}`}
                    className="text-3xl font-light text-neutral-400"
                  >
                    {employee.workEmail}
                  </a>
                </div>

                <div className="flex items-center">
                  <Link
                    href={{
                      pathname: "/employees",
                      query: {
                        department: employee.department,
                      },
                    }}
                    className={`filter-button pill active inline-flex  ${dasherizedDepartment}`}
                  >
                    {employee.department}
                  </Link>
                </div>
              </div>

              <p className="mb-8">
                Joined {parseDate(employee.startDate)}{" "}
                <span className="ml-1 text-neutral-500">
                  ({timeAgo(employee.startDate)})
                </span>
                TODO: city, state, country
              </p>
            </div>

            <div className="relative grid gap-10  pt-8">
              {/* Horizontal Rule */}
              <div
                className={`absolute -top-px h-px w-[calc(100%-568px)] bg-neutral-700`}
              />

              <div className="grid w-full grid-cols-6 gap-10">
                {/* Manager */}
                {reportsDirectlyTo && (
                  <div className="col-span-1">
                    <h5 className="mb-3 font-bold uppercase text-neutral-500">
                      Manager
                    </h5>
                    <div className="">
                      <Thumbnail employee={reportsDirectlyTo} />
                    </div>
                  </div>
                )}

                {/* Direct reports */}
                {directReports.length > 0 && (
                  <div className="col-span-5">
                    <h5 className="mb-3 font-bold uppercase text-neutral-500">
                      Direct reports
                    </h5>
                    <ul className="grid w-full grid-cols-5 gap-10">
                      {directReports.map((d) => {
                        return (
                          <li className="" key={d.id}>
                            <Thumbnail employee={d} />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>

              {/* Salary & personal info */}
              {isViewingSelf && (
                <div className="relative">
                  <div className="grid gap-10 border-t border-t-neutral-700 pt-8">
                    <Salary salary={employee.annualSalary} />
                    {/* </div>
                  <div className="grid gap-10 border-t border-t-neutral-700 pt-8"> */}
                    <PersonalEmail employee={employee} onSave={setEmployee} />
                    <Phone employee={employee} onSave={setEmployee} />
                    <PersonalInformation
                      employee={employee}
                      onSave={setEmployee}
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        </div>
      </div>
    </>
  );
}
