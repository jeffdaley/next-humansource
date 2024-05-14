"use client";

import { Employee } from "@/app/employees/[id]/page";
import Link from "next/link";
import Avatar from "../../avatar";

interface EmployeeThumbnailArgs {
  employee: Employee;
}

export default function EmployeeThumbnail(args: EmployeeThumbnailArgs) {
  const { employee } = args;
  return (
    <Link href={`/employees/${employee.id}`} className="flex gap-3.5">
      <Avatar
        employee={employee}
        className="h-12 w-12 shrink-0 overflow-hidden rounded-full"
      />
      <div className="grid pt-1">
        {/* NOTE: Normally we'd truncate these values */}
        <h5 className="font-semibold leading-tight ">{employee.name}</h5>
        <p className="truncate leading-tight text-neutral-500">
          {employee.jobTitle}
        </p>
      </div>
    </Link>
  );
}
