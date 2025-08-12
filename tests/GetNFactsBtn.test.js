import React from "react";
import GetNFactsButton from "@/components/customs/getNFacts-button";
import { render, screen } from "@testing-library/react";

// mock GetNFactsButton dependencies
jest.mock("next/navigation");
jest.mock("sonner");
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

test("displays correct text", function () {
  render(<GetNFactsButton />);
  expect(screen.getByText(/get.*facts/i)).toBeInTheDocument();
});
