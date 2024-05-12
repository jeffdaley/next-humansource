import Image from "next/image";
import { Employee } from "../employees/[id]/page";
import { HTMLProps } from "react";

/**
 * The employee avatar. If an image is present, display it.
 * Otherwise, show the first letter of the employee's name.
 */
export default function Avatar({
  employee,
  size,
  ...rest
}: HTMLProps<HTMLDivElement> & {
  employee?: Employee;
  size?: number;
}) {
  const ImageOrLetter = () => {
    if (!employee) {
      throw new Error("Employee expected to exist");
    }

    return employee.imageURL ? (
      <Image
        // FIXME: Reference the `baseURL` directly instead of fragile `../`
        src={`/images/${employee.imageURL}`}
        alt={employee.name}
        width="1200"
        height="1200"
      />
    ) : (
      <span>{employee.name.charAt(0)}</span>
    );
  };

  return (
    <div
      className={`${!employee?.imageURL && "bg-red-200"} ${rest.className}`}
      // FIXME: need a better way of concatenating classNames
    >
      <ImageOrLetter />
    </div>
  );
}
