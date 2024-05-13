"use client";

import { Employee } from "@/app/employees/[id]/page";
import React, { useState } from "react";
import Action from "../../action";

interface PersonalEmailArgs {
  employee: Employee;
  onSave: (employee: Employee) => void;

  // TODO: add "field" arg to make this more generic
}

export default function PersonalEmail(args: PersonalEmailArgs) {
  const { personalEmail } = args.employee;

  const [newPersonalEmail, setPersonalEmail] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  const resetLocalState = () => {
    setPersonalEmail(null);
  };

  const onSave = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    // TODO: Validate

    args.onSave({
      ...args.employee,
      personalEmail: newPersonalEmail || personalEmail,
    });

    setIsEditing(false);

    resetLocalState();
  };

  const onCancel = () => {
    resetLocalState();
    setIsEditing(false);
  };

  // TODO: Confirm email state
  // TODO: Show "saved" state

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-2.5">
        <h5 className="font-bold uppercase text-neutral-500">
          Personal email 🔒
        </h5>
        {!isEditing && (
          <Action
            onClick={() => setIsEditing(true)}
            className="pill w-12 bg-white text-xs text-black  hover:bg-neutral-400 "
          >
            Edit
          </Action>
        )}
      </div>
      <div className="">
        {isEditing ? (
          <form onSubmit={onSave}>
            <div className="flex gap-3">
              <input
                autoFocus
                className=" h-16 w-full text-5xl font-light"
                type="email"
                value={newPersonalEmail ?? personalEmail}
                onChange={(e) => {
                  setPersonalEmail(e.target.value);
                }}
              />
              <div className="flex gap-2">
                <button type="submit">Save</button>
                <Action onClick={onCancel}>Cancel</Action>
              </div>
            </div>
          </form>
        ) : (
          <p className="flex h-16 items-center text-5xl font-light">
            {personalEmail}
          </p>
        )}
      </div>
    </div>
  );
}
