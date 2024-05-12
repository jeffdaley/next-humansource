"use client";

import { Employee } from "@/app/employees/[id]/page";
import React, { useState } from "react";
import Action from "../../action";

interface EmployeesEmployeePersonalInformationArgs {
  employee: Employee;
  onSave: (employee: Employee) => void;
}

export default function EmployeesEmployeePersonalInformation(
  args: EmployeesEmployeePersonalInformationArgs
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
              className="w-full bg-neutral-800 mb-10"
              type="email"
              value={newPersonalEmail ?? personalEmail}
              onChange={(e) => {
                setPersonalEmail(e.target.value);
              }}
            />

            <label>Phone</label>
            <input
              className="w-full bg-neutral-800 mb-10"
              type="text"
              value={newPhone ?? phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <label>Street</label>
            <input
              className="w-full bg-neutral-800 mb-10"
              type="text"
              value={newStreet ?? street}
              onChange={(e) => {
                setStreet(e.target.value);
              }}
            />

            <label>City</label>
            <input
              className="w-full bg-neutral-800 mb-10"
              type="text"
              value={newCity ?? city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />

            <label>State</label>
            {/* TODO: dropdown */}
            <input
              className="w-full bg-neutral-800 mb-10"
              type="text"
              value={newState ?? state}
              onChange={(e) => {
                setState(e.target.value);
              }}
            />

            <label>Zip code</label>
            <input
              className="w-full bg-neutral-800 mb-10"
              type="text"
              value={newZipCode ?? zipCode}
              onChange={(e) => {
                setZipCode(e.target.value);
              }}
            />

            <label>Country</label>
            {/* TODO: Dropdown */}
            <input
              className="w-full bg-neutral-800 mb-10"
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
          <div className="border border-neutral-800">
            <div>Private to you</div>
            <h5>Personal contact info</h5>
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
        className="bg-white text-black w-32 pill h-10"
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
