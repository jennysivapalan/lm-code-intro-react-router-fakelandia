import { render, screen } from "@testing-library/react";
import { test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Header from "./header";
test("renders header text", () => {
  render(<Header />, { wrapper: BrowserRouter });
  expect(screen.getByText("FAKELANDIA")).toBeInTheDocument();
  expect(screen.getByText("JUSTICE")).toBeInTheDocument();
  expect(screen.getByText("DEPARTMENT")).toBeInTheDocument();
});
