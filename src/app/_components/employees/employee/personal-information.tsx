"use client";

import { Employee } from "@/app/employees/[id]/page";
import React, { useState } from "react";
import Action from "../../action";

interface PersonalInformationArgs {
  employee: Employee;
  onSave: (employee: Employee) => void;
}

export default function PersonalInformation(args: PersonalInformationArgs) {
  const { street, city, state, zipCode } = args.employee.address;

  const [newStreet, setStreet] = useState<string | null>(null);
  const [newCity, setCity] = useState<string | null>(null);
  const [newState, setState] = useState<string | null>(null);
  const [newZipCode, setZipCode] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  const resetLocalState = () => {
    setStreet(null);
    setCity(null);
    setState(null);
    setZipCode(null);
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
      },
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
      <div className="flex items-center gap-2.5">
        <h5 className="font-bold uppercase text-neutral-500">Address</h5>
        {/* {!isEditing && (
          <Action
            onClick={() => setIsEditing(true)}
            className="pill w-12 bg-white text-xs text-black  hover:bg-neutral-400 "
          >
            Edit
          </Action>
        )} */}
      </div>
      {isEditing ? (
        <>
          <form className="grid max-w-4xl" onSubmit={onSave}>
            {/* TODO: Improve semantics, accessibility */}
            <input
              placeholder="Street"
              className="h-16 text-5xl leading-none"
              type="text"
              value={newStreet ?? street}
              onChange={(e) => {
                setStreet(e.target.value);
              }}
            />
            <div className="flex">
              <input
                placeholder="City"
                className="inline-flex h-16 w-full text-5xl leading-none"
                type="text"
                value={newCity ?? city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />

              {/* TODO: dropdown */}
              <input
                placeholder="State"
                className="h-16 w-80 shrink-0 text-5xl leading-none"
                type="text"
                value={newState ?? state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
            </div>
            <div className="flex">
              <input
                placeholder="Zip code"
                className="h-16 w-80 text-5xl leading-none"
                type="text"
                value={newZipCode ?? zipCode}
                onChange={(e) => {
                  setZipCode(e.target.value);
                }}
              />
              <Action
                onClick={() => {
                  isEditing ? onSave() : setIsEditing(true);
                }}
                className="pill h-10 w-32 bg-white text-black"
              >
                Save
              </Action>
              <Action onClick={onCancel}>Cancel</Action>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="grid gap-4">
            <div className="flex flex-col text-5xl leading-[64px]">
              <p>{street}</p>
              <p>
                {city}, {state}
              </p>
              <p>{zipCode}</p>
            </div>
          </div>
        </>
      )}

      <Action
        onClick={() => setIsEditing(true)}
        className="pill  h-12   bg-white px-6 text-black"
      >
        Update contact information
      </Action>

      {/* A note about changing your name? */}
    </div>
  );
}
