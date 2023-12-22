import { render, screen } from "@testing-library/react";
import { test } from "vitest";

import Header from "./header";
test("renders header text", () => {
  render(<Header />);
  const someHeaderText = screen.getByText("Justice for Fakelandia ⚖️");
  expect(someHeaderText).toBeInTheDocument();
});
