import { render, screen } from "@testing-library/react";
import Nav from "./nav";
import { test } from "vitest";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

test("renders nav list", () => {
  render(<Nav />, { wrapper: BrowserRouter });
  const homeLink = screen.getByText("Home");
  expect(homeLink).toBeInTheDocument();

  const confession = screen.getByText("Confession");
  expect(confession).toBeInTheDocument();

  const misdemeanours = screen.getByText("Misdemeanours");
  expect(misdemeanours).toBeInTheDocument();
});
