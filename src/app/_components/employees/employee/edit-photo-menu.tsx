"use client";

import { EditIcon } from "@/app/employees/[id]/page";
import React, { useState } from "react";
import Action from "../../action";

interface EditPhotoMenuArgs {}

export default function EditPhotoMenu(args: EditPhotoMenuArgs) {
  const [isShown, setIsShown] = useState(false);

  // NOTE: Normally I'd position this with FloatingUI and have some kind of click-away function to close it
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
        <div className="absolute -bottom-1 right-0 flex w-56 translate-y-full flex-col rounded-3xl bg-white py-3 text-black">
          <Action className="px-6 py-0.5 text-left">Replace with...</Action>
          <Action className="px-6 py-0.5 text-left text-pink-600">
            Remove
          </Action>
        </div>
      )}
    </div>
  );
}
