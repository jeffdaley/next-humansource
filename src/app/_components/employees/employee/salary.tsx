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
    : "⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆";

  // Icons via Boxicons
  function ShowIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 11c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"></path>
        <path d="M12 10c-1.084 0-2 .916-2 2s.916 2 2 2 2-.916 2-2-.916-2-2-2z"></path>
      </svg>
    );
  }

  function HideIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M8.073 12.194 4.212 8.333c-1.52 1.657-2.096 3.317-2.106 3.351L2 12l.105.316C2.127 12.383 4.421 19 12.054 19c.929 0 1.775-.102 2.552-.273l-2.746-2.746a3.987 3.987 0 0 1-3.787-3.787zM12.054 5c-1.855 0-3.375.404-4.642.998L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.298-3.298c2.638-1.953 3.579-4.637 3.593-4.679l.105-.316-.105-.316C21.98 11.617 19.687 5 12.054 5zm1.906 7.546c.187-.677.028-1.439-.492-1.96s-1.283-.679-1.96-.492L10 8.586A3.955 3.955 0 0 1 12.054 8c2.206 0 4 1.794 4 4a3.94 3.94 0 0 1-.587 2.053l-1.507-1.507z"></path>
      </svg>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-2.5">
        <h5 className="font-bold uppercase text-neutral-500">Salary</h5>
        <Action
          onClick={() => setIsShown(!isShown)}
          className=" -m-1 rounded-full p-1  hover:bg-neutral-800"
        >
          {isShown ? <HideIcon /> : <ShowIcon />}
        </Action>
      </div>
      <p className={`big-text-light ${!isShown && "text-neutral-500"}`}>
        {formattedSalary}
        {isShown && (
          <span className="ml-1 text-sm text-neutral-500">per year</span>
        )}
      </p>
    </div>
  );
}
