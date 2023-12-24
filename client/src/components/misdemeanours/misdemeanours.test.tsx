import { render, screen } from "@testing-library/react";
import Misdemeanours from "./misdemeanours";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { test } from "vitest";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

const validResponse = http.get(
  "http://localhost:8080/api/misdemeanours/10",
  () =>
    HttpResponse.json({
      misdemeanours: [
        {
          citizenId: 10192,
          misdemeanour: "united",
          date: "22/12/2023",
        },
        {
          citizenId: 3961,
          misdemeanour: "vegetables",
          date: "20/12/2023",
        },
        {
          citizenId: 6723,
          misdemeanour: "lift",
          date: "19/12/2023",
        },
      ],
    })
);

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Misdemeanours", () => {
  test("renders misdemeanours component", async () => {
    server.use(validResponse);
    const { container } = await render(<Misdemeanours />, {
      wrapper: BrowserRouter,
    });
    expect(container.getElementsByClassName("misdeameanours-list").length).toBe(
      1
    );

    expect(container.getElementsByTagName("select").length).toBe(1);
  });
  test("renders the misdemeanours from the list", async () => {
    server.use(validResponse);
    await render(<Misdemeanours />, {
      wrapper: BrowserRouter,
    });

    const firstItem = await screen.findByText("10192, 22/12/2023, united");
    expect(firstItem).toBeInTheDocument();

    const secondItem = await screen.findByText("3961, 20/12/2023, vegetables");
    expect(secondItem).toBeInTheDocument();

    const thirdItem = await screen.findByText("6723, 19/12/2023, lift");
    expect(thirdItem).toBeInTheDocument();
  });
});
