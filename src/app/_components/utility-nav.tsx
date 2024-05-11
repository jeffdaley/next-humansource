"use client";

import { EMPLOYEES, USER_ID } from "../lib/data";
import Avatar from "./avatar";

interface UtilityNavArgs {
  didScroll: boolean;
}

export default function UtilityNav(args: UtilityNavArgs) {
  const testUser = EMPLOYEES.find((e) => e.id === USER_ID);

  return (
    <div
      className={`sticky z-10 top-0 flex w-full px-8 items-center py-5 justify-between ${
        args.didScroll && "bg-black/95"
      }`}
    >
      <div className="shrink-0 flex gap-1 text-center">
        <div className="w-6 h-6 bg-white rounded-full" />
        HumanSource
        <div className="text-gray-500">| TabbyML</div>
      </div>
      <div className="flex w-full justify-end gap-2.5">
        <div className="relative w-full max-w-[600px]">
          <input
            type="search"
            placeholder="Find people, benefits, policies..."
            className="w-full h-10  bg-neutral-800 placeholder-neutral-500 pl-11 pr-3 pill"
          />
          {/* Search icon */}
          <div className="absolute pointer-events-none left-3.5 top-1/2 -translate-y-1/2">
            🔍
          </div>
        </div>
        <Avatar
          employee={testUser}
          className="justify-end shrink-0 !w-10 !h-10"
        />
      </div>
    </div>
  );
}
