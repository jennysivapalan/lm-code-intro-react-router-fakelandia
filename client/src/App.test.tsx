import { render, screen, fireEvent } from "@testing-library/react";

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { test } from "vitest";
import "@testing-library/jest-dom";
import Confession from "./components/confession/confession";
import Misdemeanours from "./components/misdemeanours/misdemeanours";

const validMisdeameanourResponse = http.get(
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

const validPostResponse = http.post("http://localhost:8080/api/confess", () =>
  HttpResponse.json({ success: true, message: "Success!" })
);

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders the misdemeanours from the list", async () => {
  server.use(validMisdeameanourResponse);
  server.use(validPostResponse);

  render(<Confession />);

  const subject = screen.getByTestId("subject");
  fireEvent.change(subject, {
    target: { value: "i have something to report" },
  });

  const reason = screen.getByTestId("reason");
  fireEvent.change(reason, { target: { value: "rudeness" } });

  const details = screen.getByTestId("details");
  fireEvent.change(details, {
    target: { value: "Citizen 452 loves united and I am reporting them" },
  });

  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
  expect(button).not.toHaveAttribute("disabled");

  fireEvent.click(button);
  expect(await screen.findAllByText("Success!")).toBeInTheDocument;

  await render(<Misdemeanours />);

  const firstItem = await screen.findByText("10192");
  expect(firstItem).toBeInTheDocument();

  const secondItem = await screen.findByText("3961");
  expect(secondItem).toBeInTheDocument();

  const thirdItem = await screen.findByText("6723");
  expect(thirdItem).toBeInTheDocument();

  const fourthItem = await screen.findByText("rudeness 🤪");
  expect(fourthItem).toBeInTheDocument();
});
