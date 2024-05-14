"use client";

import { EditIcon } from "@/app/employees/[id]/page";
import React, { useState } from "react";
import Action from "../../action";

function ReplaceImageIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M4 5h13v7h2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-2H4V5z"></path>
      <path d="m8 11-3 4h11l-4-6-3 4z"></path>
      <path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path>
    </svg>
  );
}

function RemoveIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M7 11h10v2H7z"></path>
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
    </svg>
  );
}

export default function EditPhotoMenu() {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="relative">
      <Action
        onClick={() => setIsShown(!isShown)}
        className="pill flex  h-12 items-center gap-2 bg-white px-8 text-black hover:bg-neutral-100"
      >
        <EditIcon />
        Edit photo <span className="ml-1">▾</span>
      </Action>
      {isShown && (
        <div className="absolute -bottom-1 right-0 flex w-56 translate-y-full flex-col overflow-hidden rounded-3xl bg-white py-3 text-black">
          <Action className="flex gap-2 px-6 py-1 text-left hover:bg-neutral-200">
            <ReplaceImageIcon />
            Replace...
          </Action>
          <Action className="flex gap-2 px-6 py-1 text-left text-pink-600 hover:bg-neutral-200">
            <RemoveIcon />
            Remove
          </Action>
        </div>
      )}
    </div>
  );
}
