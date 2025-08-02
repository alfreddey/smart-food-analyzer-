"use client";
import { usePathname, useSearchParams } from "next/navigation";

export default function ServingSizeInput() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleNumberChange = function (e) {
    const value = e.target.value;
    const param = new URLSearchParams(document.location.search);
    if (value > 5 || value < 1) {
      // throw error message
      return;
    }

    param.set("size", value);
    window.history.replaceState({}, "", `${pathname}?${param.toString()}`);
  };

  return (
    <>
      <span>Serving size: </span>
      <input
        type="number"
        defaultValue={1}
        onChange={handleNumberChange}
        min="1"
        max="5"
        name="serving_size"
        className="border rounded p-1"
      />
    </>
  );
}
