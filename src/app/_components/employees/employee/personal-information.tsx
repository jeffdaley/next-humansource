"use client";

import { Employee } from "@/app/employees/[id]/page";
import React, { useState } from "react";
import Action from "../../action";

interface PersonalInformationArgs {
  employee: Employee;
  onSave: (employee: Employee) => void;
}

export default function PersonalInformation(args: PersonalInformationArgs) {
  const { personalEmail, phone } = args.employee;
  const { street, city, state, zipCode } = args.employee.address;

  const [newPersonalEmail, setPersonalEmail] = useState<string | null>(null);
  const [newPhone, setPhone] = useState<string | null>(null);
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

  function EditIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
        <path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
      </svg>
    );
  }

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

  interface LabelArgs {
    label: string;
    isEditing?: boolean;
    for?: string;
  }
  function Label(args: LabelArgs) {
    return (
      <div className="font-bold uppercase text-neutral-500">
        {isEditing ? (
          <label htmlFor={args.for}>{args.label}</label>
        ) : (
          <h5>{args.label}</h5>
        )}
      </div>
    );
  }

  return (
    <div>
      {isEditing ? (
        <>
          <form className=" max-w-4xl" onSubmit={onSave}>
            <div className="mb-8 grid gap-10">
              <div>
                <Label
                  for="personal-email"
                  label="Personal email"
                  isEditing={true}
                />
                <input
                  className=" h-16 w-full text-5xl font-light"
                  type="email"
                  value={newPersonalEmail ?? personalEmail}
                  onChange={(e) => {
                    setPersonalEmail(e.target.value);
                  }}
                />
              </div>
              <div>
                <Label for="phone" label="Phone" isEditing={true} />
                <input
                  className=" h-16 w-full text-5xl font-light"
                  type="email"
                  value={newPhone ?? phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
              <div>
                {/* TODO: this is more of a Legend */}
                <Label for="street" label="Address" isEditing={true} />
                <div className="relative">
                  <div className="absolute -bottom-px z-10 h-px w-full bg-black" />
                  <input
                    placeholder="Street"
                    className="h-16 w-full text-5xl leading-none focus:z-10"
                    type="text"
                    value={newStreet ?? street}
                    onChange={(e) => {
                      setStreet(e.target.value);
                    }}
                  />
                </div>
                <div className="flex gap-px">
                  <input
                    placeholder="City"
                    className="inline-flex h-16 w-full text-5xl leading-none focus:z-10"
                    type="text"
                    value={newCity ?? city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />

                  {/* TODO: dropdown */}
                  <input
                    placeholder="State"
                    className="h-16 w-80 shrink-0 pl-4 text-5xl leading-none focus:z-10"
                    type="text"
                    value={newState ?? state}
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                  />
                </div>
                <input
                  placeholder="Zip code"
                  className="h-16 w-80 border-t border-t-black text-5xl leading-none"
                  type="text"
                  value={newZipCode ?? zipCode}
                  onChange={(e) => {
                    setZipCode(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Action
                onClick={() => {
                  isEditing ? onSave() : setIsEditing(true);
                }}
                className="pill h-12 bg-white px-8 text-black"
              >
                Save changes
              </Action>
              <Action
                className="pill h-12 px-8 text-neutral-500 hover:text-white "
                onClick={onCancel}
              >
                Cancel
              </Action>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="mb-8 grid gap-10">
            <div>
              <Label label="Personal email" />
              <p className="flex h-16 items-center text-5xl font-light">
                {personalEmail}
              </p>
            </div>
            <div>
              <Label label="Phone" />
              <p className="flex h-16 items-center text-5xl font-light">
                {phone}
              </p>
            </div>
            <div>
              <Label label="Address" />
              <div className="grid gap-4">
                <div className="flex flex-col text-5xl leading-[64px]">
                  <p>{street}</p>
                  <p>
                    {city}, {state}
                  </p>
                  <p>{zipCode}</p>
                </div>
              </div>
            </div>
          </div>
          <Action
            onClick={() => setIsEditing(true)}
            className="pill flex h-12  items-center gap-2   bg-white px-8 text-black"
          >
            {/* <div className="-ml-1">
              <EditIcon />
            </div> */}
            Update contact information
          </Action>
        </>
      )}

      {/* A note about changing your name? */}
    </div>
  );
}
