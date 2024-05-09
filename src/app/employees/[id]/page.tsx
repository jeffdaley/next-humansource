"use client";

import { DepartmentName } from "../page";

export interface Employee {
  id: string;
  name: string;
  email: string;
  department?: DepartmentName;
}

export default function EmployeesEmployeePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <>
      <h1>{params.id}: someName</h1>
    </>
  );
}
