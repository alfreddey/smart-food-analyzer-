import ServingSize from "@/components/customs/serving-size";
import { render, screen, fireEvent } from "@testing-library/react";

test("displays empty input value on initial load", function () {
  render(<ServingSize />);
  expect(screen.getByRole("spinbutton")).toHaveTextContent("");
});

test("displays correct value when changed", function () {
  render(<ServingSize />);
  fireEvent.change(screen.getByRole("spinbutton"), {
    target: { value: "2" },
  });
  expect(screen.getByRole("spinbutton")).toHaveValue(2);
});
