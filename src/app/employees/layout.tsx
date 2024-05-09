import { departments as DEPARTMENTS, employees as EMPLOYEES } from "./page";

// TODO: move elsewhere?
async function fetchEmployees() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return EMPLOYEES;
}

// TODO: move elsewhere?
async function fetchDepartments() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return DEPARTMENTS;
}

export default async function EmployeesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // TODO: loading screen
  const [_employees, _departments] = await Promise.all([
    fetchEmployees(),
    fetchDepartments(),
  ]);

  /**
   * Going to show a list of Employees as fetched from the API.
   * We'll link to the `/employees` route.
   */
  return <>{children}</>;
}
