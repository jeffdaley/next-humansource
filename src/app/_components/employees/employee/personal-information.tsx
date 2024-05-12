"use client";

import { Employee } from "@/app/employees/[id]/page";
import React, { useState } from "react";
import Action from "../../action";

interface EmployeesEmployeePersonalInformationArgs {
  employee: Employee;
  onSave: () => void;
}

export default function EmployeesEmployeePersonalInformation(
  args: EmployeesEmployeePersonalInformationArgs
) {
  const cachedEmployee = args.employee;

  const [employee, setEmployee] = useState(args.employee);
  const [streetAddress, setStreetAddress] = useState(employee.address.street);
  const [personalEmail, setPersonalEmail] = useState(employee.personalEmail);

  const [isEditing, setIsEditing] = useState(false);

  const onSave = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    // TODO: Validate

    setEmployee({
      ...employee,
      address: {
        ...employee.address,
        street: streetAddress,
        // TODO: local versions?
        city: employee.address.city,
        state: employee.address.state,
        zipCode: employee.address.zipCode,
        country: employee.address.country,
      },
      personalEmail: personalEmail,
    });

    args.onSave();
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <>
          <form onSubmit={onSave}>
            <input
              className="w-full bg-neutral-800 mb-10"
              type="email"
              value={personalEmail}
              onChange={(e) => {
                setPersonalEmail(e.target.value);
              }}

              // TODO: this needs cancel / cache logic
            />
            <input
              className="w-full bg-neutral-800 mb-10"
              type="text"
              value={streetAddress}
              onChange={(e) => {
                setStreetAddress(e.target.value);
              }}
              // TODO: this needs cancel / cache logic
            />
          </form>
        </>
      ) : (
        <>
          <div className="border border-neutral-800">
            <div>Private to you</div>
            <p className="">Personal email: {employee.personalEmail}</p>
            {/* TODO: add all other address info */}
            <p className="">Address: {employee.address.street}</p>
            <p className="">Salary: ${employee.annualSalary} per year</p>
          </div>
        </>
      )}
      <Action
        onClick={() => {
          isEditing ? onSave() : setIsEditing(true);
        }}
        className="bg-white text-black w-32 pill h-10"
      >
        {isEditing ? "Save" : "Edit"}
      </Action>
    </>
  );
}
