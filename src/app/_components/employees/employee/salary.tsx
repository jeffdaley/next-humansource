"use client";

import { useState } from "react";
import Action from "../../action";

interface SalaryComponentArgs {
  salary: number;
}

export default function EmployeesEmployeeSalary(args: SalaryComponentArgs) {
  const [isShown, setIsShown] = useState(false);

  const formattedSalary = isShown
    ? `$${args.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    : "Hidden";

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <h5 className="">Salary</h5>
        <Action
          onClick={() => setIsShown(!isShown)}
          className="pill w-12 border border-neutral-500 text-xs  text-neutral-500"
        >
          {isShown ? "Hide" : "Show"}
        </Action>
      </div>
      <p className={`text-5xl ${!isShown && "text-neutral-500"}`}>
        {formattedSalary}
        {isShown && (
          <span className="ml-1 text-sm text-neutral-500">per year</span>
        )}
      </p>
    </div>
  );
}
