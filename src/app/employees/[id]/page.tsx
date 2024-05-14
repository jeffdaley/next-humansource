"use client";

import Action from "@/app/_components/action";
import Avatar from "@/app/_components/avatar";
import EditPhotoMenu from "@/app/_components/employees/employee/edit-photo-menu";
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

export function EditIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-neutral-500"
    >
      <path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"></path>
    </svg>
  );
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

  function JoinDateIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-neutral-500"
      >
        <circle cx="12" cy="4" r="2"></circle>
        <path d="M15 22V9h5V7H4v2h5v13h2v-7h2v7z"></path>
      </svg>
    );
  }

  function LocationIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-neutral-500"
      >
        <path d="M11 18.791V20H9v2h6v-2h-2v-1.845a9.934 9.934 0 0 0 3.071-2.084c3.898-3.898 3.898-10.243 0-14.143l-1.414 1.414c3.119 3.12 3.119 8.195 0 11.314-3.119 3.118-8.195 3.12-11.314 0L1.929 16.07A9.971 9.971 0 0 0 9 18.994a9.98 9.98 0 0 0 2-.203z"></path>
        <path d="M3 9c0 3.309 2.691 6 6 6s6-2.691 6-6-2.691-6-6-6-6 2.691-6 6zm10 0c0 2.206-1.794 4-4 4s-4-1.794-4-4 1.794-4 4-4 4 1.794 4 4z"></path>
      </svg>
    );
  }
  function OrgChartIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-neutral-500"
      >
        <path d="M20 13.01h-7V10h1c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v4c0 1.103.897 2 2 2h1v3.01H4V18H3v4h4v-4H6v-2.99h5V18h-1v4h4v-4h-1v-2.99h5V18h-1v4h4v-4h-1v-4.99zM10 8V4h4l.002 4H10z"></path>
      </svg>
    );
  }

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

              <div className="absolute bottom-0 right-8 z-20 flex translate-y-1/2 gap-2">
                {isViewingSelf && <EditPhotoMenu />}
              </div>
            </div>
            <div className="relative z-10 flex min-h-[504px]  flex-col justify-between ">
              <div className="mb-16">
                <Headline>
                  {/* TODO: show a lock icon if the user is viewing themselves with a tooltip instructing them to contact HR to change it. We probably want to wrap the last name in a relatively positioned span with an interactive element positioned absolutely  */}
                  <span className="pr-80">{employee.name}</span>
                </Headline>
                <p className="big-text-light mb-2 mt-10">{employee.jobTitle}</p>
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
                    className={`filter-button active inline-flex  ${dasherizedDepartment}`}
                  >
                    {employee.department}
                  </Link>
                </div>
              </div>

              <div className="mb-8 flex max-w-[calc(100%-620px)] justify-between">
                <div className="flex gap-2 ">
                  <JoinDateIcon />
                  <p>
                    Joined {parseDate(employee.startDate)}{" "}
                    <span className="ml-1 text-neutral-500">
                      ({timeAgo(employee.startDate)})
                    </span>
                  </p>
                </div>
                <div className="flex gap-2 ">
                  <LocationIcon />
                  <p>
                    {employee.address.city}, {employee.address.state}
                  </p>
                </div>
              </div>
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
