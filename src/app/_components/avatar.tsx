import Image from "next/image";
import { Employee } from "../employees/[id]/page";

/**
 * The employee avatar. If an image is present, display it.
 * Otherwise, show the first letter of the employee's name.
 */
export default function Avatar({ employee }: { employee?: Employee }) {
  const ImageOrLetter = () => {
    if (!employee) {
      throw new Error("Employee expected to exist");
    }
    return employee.imageURL ? (
      <Image
        // FIXME: Reference the `baseURL` directly instead of fragile `../`
        src="../images/employee-placeholder.svg"
        alt={employee.name}
        width="400"
        height="400"
      />
    ) : (
      <span>{employee.name.charAt(0)}</span>
    );
  };

  return (
    <div className="w-8 h-8 bg-red-200">
      <ImageOrLetter />
    </div>
  );
}
