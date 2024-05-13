"use client";

import { Employee } from "@/app/employees/[id]/page";
import React, { useState } from "react";
import Action from "../../action";

interface EmployeesEmployeePersonalInformationArgs {
  employee: Employee;
  onSave: (employee: Employee) => void;
}

export default function EmployeesEmployeePersonalInformation(
  args: EmployeesEmployeePersonalInformationArgs,
) {
  const { street, city, state, zipCode, country } = args.employee.address;
  const { phone, personalEmail } = args.employee;

  const [newStreet, setStreet] = useState<string | null>(null);
  const [newCity, setCity] = useState<string | null>(null);
  const [newState, setState] = useState<string | null>(null);
  const [newZipCode, setZipCode] = useState<string | null>(null);
  const [newCountry, setCountry] = useState<string | null>(null);
  const [newPhone, setPhone] = useState<string | null>(null);
  const [newPersonalEmail, setPersonalEmail] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  const resetLocalState = () => {
    setStreet(null);
    setCity(null);
    setState(null);
    setZipCode(null);
    setCountry(null);
    setPhone(null);
    setPersonalEmail(null);
  };

  const onSave = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    // TODO: Validate

    args.onSave({
      ...args.employee,
      address: {
        street: newStreet || street,
        city: newCity || city,
        state: newState || state,
        zipCode: newZipCode || zipCode,
        country: newCountry || country,
      },
      personalEmail: newPersonalEmail || personalEmail,
    });

    setIsEditing(false);

    resetLocalState();
  };

  const onCancel = () => {
    resetLocalState();
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <>
          <form onSubmit={onSave}>
            <label>Personal email</label>
            <input
              className="mb-10 w-full bg-neutral-800"
              type="email"
              value={newPersonalEmail ?? personalEmail}
              onChange={(e) => {
                setPersonalEmail(e.target.value);
              }}
            />

            <label>Phone</label>
            <input
              className="mb-10 w-full bg-neutral-800"
              type="text"
              value={newPhone ?? phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <label>Street</label>
            <input
              className="mb-10 w-full bg-neutral-800"
              type="text"
              value={newStreet ?? street}
              onChange={(e) => {
                setStreet(e.target.value);
              }}
            />

            <label>City</label>
            <input
              className="mb-10 w-full bg-neutral-800"
              type="text"
              value={newCity ?? city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />

            <label>State</label>
            {/* TODO: dropdown */}
            <input
              className="mb-10 w-full bg-neutral-800"
              type="text"
              value={newState ?? state}
              onChange={(e) => {
                setState(e.target.value);
              }}
            />

            <label>Zip code</label>
            <input
              className="mb-10 w-full bg-neutral-800"
              type="text"
              value={newZipCode ?? zipCode}
              onChange={(e) => {
                setZipCode(e.target.value);
              }}
            />

            <label>Country</label>
            {/* TODO: Dropdown */}
            <input
              className="mb-10 w-full bg-neutral-800"
              type="text"
              value={newCountry ?? country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            />
          </form>
        </>
      ) : (
        <>
          <div className="border-t border-neutral-700 pt-8">
            <h3 className="text-5xl">Personal info</h3>
            <div>Private to you</div>
            <p className="">{personalEmail}</p>
            <p>{phone}</p>
            <h5>Address</h5>
            <p>{street}</p>
            <p>{city}</p>
            <p>{country}</p>
            <p>{zipCode}</p>
          </div>
        </>
      )}
      <Action
        onClick={() => {
          isEditing ? onSave() : setIsEditing(true);
        }}
        className="pill h-10 w-32 bg-white text-black"
      >
        {isEditing ? "Save" : "Edit"}
      </Action>
      {isEditing && (
        <button type="reset" onClick={onCancel}>
          Cancel
        </button>
      )}

      {/* A note about changing your name? */}
    </>
  );
}
