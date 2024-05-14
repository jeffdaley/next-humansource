"use client";

import Link from "next/link";
import { EMPLOYEES, USER_ID } from "../lib/data";
import Avatar from "./avatar";

interface UtilityNavArgs {
  didScroll: boolean;
}

// Via Boxicons
function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
    >
      <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
    </svg>
  );
}

export default function UtilityNav(args: UtilityNavArgs) {
  const testUser = EMPLOYEES.find((e) => e.id === USER_ID);

  return (
    <div
      className={`sticky top-0 z-30 flex w-full items-center justify-between px-12 py-5 ${
        args.didScroll && "bg-black/95"
      }`}
    >
      <div className="flex shrink-0 gap-1 text-center">
        <div className="h-6 w-6 rounded-full bg-white" />
        HumanSource
        <div className="text-neutral-500">| TabbyML</div>
      </div>
      <div className="flex w-full justify-end gap-2.5">
        <div className="relative w-full max-w-[600px]">
          <input
            type="search"
            placeholder="Find people, benefits, policies..."
            className="h-10  w-full bg-neutral-800 pl-9 pr-3"
          />
          {/* Search icon */}
          <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </div>
        </div>
        <Link href={`/employees/${USER_ID}`}>
          <Avatar
            employee={testUser}
            className="h-10 w-10 shrink-0 justify-end overflow-hidden rounded-full"
          />
        </Link>
      </div>
    </div>
  );
}
