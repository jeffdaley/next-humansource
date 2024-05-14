"use client";

import { redirect } from "next/navigation";
import { USER_ID } from "./lib/data";
export default function Home() {
  redirect(`employees/${USER_ID}`);
}
