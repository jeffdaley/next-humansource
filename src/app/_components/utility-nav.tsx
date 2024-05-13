"use client";

import Link from "next/link";
import { EMPLOYEES, USER_ID } from "../lib/data";
import Avatar from "./avatar";

interface UtilityNavArgs {
  didScroll: boolean;
}

export default function UtilityNav(args: UtilityNavArgs) {
  const testUser = EMPLOYEES.find((e) => e.id === USER_ID);

  return (
    <div
      className={`sticky top-0 z-10 flex w-full items-center justify-between px-8 py-5 ${
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
            className="pill h-10  w-full bg-neutral-800 pl-11 pr-3 placeholder-neutral-500"
          />
          {/* Search icon */}
          <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
            🔍
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
