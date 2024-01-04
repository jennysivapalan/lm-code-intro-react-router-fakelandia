import { render, screen, fireEvent } from "@testing-library/react";
import Misdemeanours from "./misdemeanours";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { test } from "vitest";
import "@testing-library/jest-dom";

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

const errorMisdeameanourResponse = http.get(
  "http://localhost:8080/api/misdemeanours/10",
  () => {
    return new HttpResponse(null, {
      status: 500,
      statusText: "oopsie",
    });
  }
);

const validImageListReponse = http.get("https://picsum.photos/v2/list", () =>
  HttpResponse.json([{ id: "1" }, { id: "2" }, { id: "3" }])
);

const mockedImageResponse = http.get("https://picsum.photos/id", () =>
  HttpResponse.text("an-image")
);

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Misdemeanours", () => {
  test("renders misdemeanours component", async () => {
    server.use(validMisdeameanourResponse);
    server.use(validImageListReponse);
    server.use(mockedImageResponse);

    const { container } = await render(<Misdemeanours />);

    expect(container.getElementsByClassName("table-container").length).toBe(1);

    expect(container.getElementsByTagName("select").length).toBe(1);
  });
  test("renders the misdemeanours from the list", async () => {
    server.use(validMisdeameanourResponse);
    server.use(validImageListReponse);
    server.use(mockedImageResponse);

    await render(<Misdemeanours />);

    const firstItem = await screen.findByText("10192");
    expect(firstItem).toBeInTheDocument();
    const firstItemImage = await screen.findByTestId("mis-image-1");
    expect(firstItemImage.getAttribute("src")).toBe(
      "https://picsum.photos/id/1/200/200"
    );

    const secondItem = await screen.findByText("20/12/2023");
    expect(secondItem).toBeInTheDocument();

    const thirdItem = await screen.findByText("lift 🗣");
    expect(thirdItem).toBeInTheDocument();
  });

  test("filters the misdemeanours from the list", async () => {
    server.use(validMisdeameanourResponse);
    server.use(validImageListReponse);
    server.use(mockedImageResponse);

    await render(<Misdemeanours />);

    expect(await screen.findByText("10192")).toBeInTheDocument();

    expect(await screen.findByText("3961")).toBeInTheDocument();

    expect(await screen.findByText("6723")).toBeInTheDocument();

    const input = screen.getByDisplayValue("Filter");
    fireEvent.change(input, { target: { value: "united" } });

    expect(await screen.findByText("10192")).toBeInTheDocument();

    expect(await screen.queryAllByText("3961")).toHaveLength(0);
    expect(await screen.queryAllByText("6723")).toHaveLength(0);
  });

  test("shows the error message when invalid response from misdemeanours", async () => {
    server.use(errorMisdeameanourResponse);
    server.use(validImageListReponse);
    server.use(mockedImageResponse);

    await render(<Misdemeanours />);

    const errorMsg = await screen.findByText(
      "Sorry an error occurred fetching misdemeanours. Try again later."
    );
    expect(errorMsg).toBeInTheDocument;
  });
});
