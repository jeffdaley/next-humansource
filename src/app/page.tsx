"use client";

import { Headline } from "./_components/headline";
import { redirect } from "next/navigation";
import { USER_ID } from "./lib/data";
export default function Home() {
  // Need to redirect to "employees/" + USER_ID
  redirect(`employees/${USER_ID}`);

  return (
    <div className="px-12 pt-12">
      <Headline>Home</Headline>
    </div>
  );
}
