"use client";

import { Employee } from "@/app/employees/[id]/page";
import React, { useState } from "react";
import Action from "../../action";

interface PersonalInformationArgs {
  employee: Employee;
  onSave: (employee: Employee) => void;
}

export default function PersonalInformation(args: PersonalInformationArgs) {
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
    <div>
      <div className="mb-3 flex items-center gap-2.5">
        <h5 className="font-bold uppercase text-neutral-500">
          Personal Info 🔒
        </h5>
        {!isEditing && (
          <Action
            onClick={() => setIsEditing(true)}
            className="pill w-12 bg-neutral-500 text-xs text-black  hover:bg-neutral-400 "
          >
            Edit
          </Action>
        )}
      </div>
      {isEditing ? (
        <>
          <form onSubmit={onSave}>
            <div className="flex">
              {/* TODO: Semantics */}
              <label className="w-32 font-bold">Email</label>
              <input
                className="mb-10 w-full bg-neutral-800"
                type="email"
                value={newPersonalEmail ?? personalEmail}
                onChange={(e) => {
                  setPersonalEmail(e.target.value);
                }}
              />
            </div>

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
          <div className="grid gap-4">
            <div className="flex">
              <p className="w-32 font-bold">Email</p>
              <p className="">{personalEmail}</p>
            </div>
            <div className="flex">
              <p className="w-32 font-bold">Address</p>
              <div>
                <p>{street}</p>
                <p>
                  {city}, {state}
                </p>
                <p>{zipCode}</p>
              </div>
            </div>
            <div className="flex">
              <p className="w-32 font-bold">Phone</p>
              <p>{phone}</p>
            </div>
          </div>
        </>
      )}
      {isEditing && (
        <>
          <Action
            onClick={() => {
              isEditing ? onSave() : setIsEditing(true);
            }}
            className="pill h-10 w-32 bg-white text-black"
          >
            Save
          </Action>
          <Action onClick={onCancel}>Cancel</Action>
        </>
      )}

      {/* A note about changing your name? */}
    </div>
  );
}
