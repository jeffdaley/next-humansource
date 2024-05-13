"use client";

import { useState } from "react";
import Action from "../../action";

interface SalaryComponentArgs {
  salary: number;
}

export default function Salary(args: SalaryComponentArgs) {
  const [isShown, setIsShown] = useState(false);

  const formattedSalary = isShown
    ? `$${args.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    : "×××××××××";

  return (
    <div>
      <div className="mb-3 flex items-center gap-2.5">
        <h5 className="font-bold uppercase text-neutral-500">Salary 🔒</h5>
        <Action
          onClick={() => setIsShown(!isShown)}
          className="pill w-12 bg-white text-xs text-black  hover:bg-neutral-400 "
        >
          {isShown ? "Hide" : "Show"}
        </Action>
      </div>
      <p className={`text-5xl font-light ${!isShown && "text-neutral-500"}`}>
        {formattedSalary}
        {isShown && (
          <span className="ml-1 text-sm text-neutral-500">per year</span>
        )}
      </p>
    </div>
  );
}
