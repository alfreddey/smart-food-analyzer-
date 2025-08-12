import { render, screen } from "@testing-library/react";
import Page from "../frontend/app/page";

// Mock the Next.js navigation functions
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

// Mock the child components
jest.mock("@/components/customs/getNFacts-button", () => {
  return function GetNFactsButton() {
    return <button>Get Nutritional Facts</button>;
  };
});

jest.mock("@/components/customs/image-dropzone", () => {
  return function ImageDropzone() {
    return <div>Image Dropzone</div>;
  };
});

jest.mock("@/components/customs/macros", () => {
  return function MacroDonutChart() {
    return <div>Macro Chart</div>;
  };
});

jest.mock("@/components/customs/serving-size", () => {
  return function ServingSizeInput() {
    return <div>Serving Size Input</div>;
  };
});

// Mock the UI components
jest.mock("@/components/ui/accordion", () => ({
  Accordion: ({ children }) => <div>{children}</div>,
  AccordionContent: ({ children }) => <div>{children}</div>,
  AccordionItem: ({ children }) => <div>{children}</div>,
  AccordionTrigger: ({ children }) => <div>{children}</div>,
}));

// Mock lucide-react
jest.doMock(
  "lucide-react",
  () => ({
    Info: function () {
      return <div>Info Icon</div>;
    },
  }),
  { virtual: true }
);

// Mock fetch globally
global.fetch = jest.fn();

test("displays Get Nutritional Facts button during page load", async function () {
  // Mock the props that would come from Next.js
  const mockProps = {
    searchParams: Promise.resolve({}),
  };

  render(await Page(mockProps));

  const button = screen.getByRole("button", {
    name: /get nutritional facts/i,
  });

  expect(button).toBeInTheDocument();
});

test("displays Discover Your Meal's Macronutrient Profile during initial load", async function () {
  const mockProps = {
    searchParams: Promise.resolve({}),
  };

  render(await Page(mockProps));
  expect(screen.getByText(/^Discover.*Profile$/i)).toBeInTheDocument();
});
