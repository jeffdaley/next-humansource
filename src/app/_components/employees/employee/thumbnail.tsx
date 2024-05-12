"use client";

import { Employee } from "@/app/employees/[id]/page";
import Link from "next/link";
import Avatar from "../../avatar";

interface EmployeesEmployeeThumbnailArgs {
  employee: Employee;
}

export default function EmployeesEmployeeThumbnail(
  args: EmployeesEmployeeThumbnailArgs,
) {
  const { employee } = args;
  return (
    <Link
      href={`/employees/${employee.id}`}
      className="flex items-center gap-3"
    >
      <Avatar
        employee={employee}
        className="h-16 w-16 overflow-hidden rounded-full"
      />
      <div className="">
        {/* TODO: Truncate names */}
        <h5 className="text-lg font-semibold leading-none ">{employee.name}</h5>
        <p className="text-neutral-500">{employee.jobTitle}</p>
      </div>
    </Link>
  );
}
