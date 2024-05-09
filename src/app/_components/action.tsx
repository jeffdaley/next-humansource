"use client";

import React, { HTMLProps } from "react";

export default function Action({
  children,
  ...rest
}: HTMLProps<HTMLButtonElement> & { children: React.ReactNode }) {
  return (
    <button {...rest} type="button">
      {children}
    </button>
  );
}
