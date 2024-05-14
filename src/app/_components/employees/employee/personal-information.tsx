"use client";

import { EditIcon, Employee } from "@/app/employees/[id]/page";
import React, { useState } from "react";
import Action from "../../action";

interface PersonalInformationArgs {
  employee: Employee;
  onSave: (employee: Employee) => void;
}

export function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
    </svg>
  );
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
    setPersonalEmail(null);
    setPhone(null);
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
                  className=" big-input -ml-6 h-16 w-full"
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
                  className=" big-input -ml-6 h-16 w-full"
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
                  <div className="absolute -bottom-px z-10 h-0.5 w-full bg-black" />
                  <input
                    placeholder="Street"
                    className="big-input  relative -ml-6 h-16 w-full leading-none focus:z-10"
                    type="text"
                    value={newStreet ?? street}
                    onChange={(e) => {
                      setStreet(e.target.value);
                    }}
                  />
                </div>
                <div className=" flex gap-1">
                  <input
                    placeholder="City"
                    className="big-input -ml-6 inline-flex h-16 w-full font-light leading-none focus:z-10"
                    type="text"
                    value={newCity ?? city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />

                  {/* TODO: dropdown */}
                  <input
                    placeholder="State"
                    className="big-input mr-6 h-16 w-80 shrink-0 pl-4 font-light leading-none focus:z-10"
                    type="text"
                    value={newState ?? state}
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                  />
                </div>
                <input
                  placeholder="Zip code"
                  className="big-input -ml-6 h-16 w-80 border-t-2 border-t-black font-light leading-none"
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
                className="pill flex h-12 items-center gap-2 bg-white px-8 text-black hover:bg-neutral-100"
              >
                <div className="-ml-1.5">
                  <CheckIcon />
                </div>
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
              <p className="big-text-light flex h-16 items-center">
                {personalEmail}
              </p>
            </div>
            <div>
              <Label label="Phone" />
              <p className="big-text-light flex h-16 items-center">{phone}</p>
            </div>
            <div>
              <Label label="Address" />
              <div className="grid gap-4">
                <div className="big-text-light flex flex-col !leading-[64px]">
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
            className="pill flex h-12  items-center gap-2 bg-white   px-8 text-black hover:bg-neutral-100"
          >
            <div className="-ml-1.5">
              <EditIcon />
            </div>
            Update contact information
          </Action>
        </>
      )}

      {/* A note about changing your name? */}
    </div>
  );
}
