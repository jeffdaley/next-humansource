import { DEPARTMENTS, EMPLOYEES } from "../lib/data";

// TODO: Add metadata to the title
// https://nextjs.org/docs/app/building-your-application/optimizing/metadata

export default function EmployeesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
