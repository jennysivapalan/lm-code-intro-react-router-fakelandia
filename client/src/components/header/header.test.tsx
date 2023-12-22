import { render, screen } from "@testing-library/react";
import { test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Header from "./header";
test("renders header text", () => {
  render(<Header />, { wrapper: BrowserRouter });
  const someHeaderText = screen.getByText("Justice for Fakelandia ⚖️");
  expect(someHeaderText).toBeInTheDocument();
});
