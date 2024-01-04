import Form from "./form";
import { render, screen, fireEvent } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const validPostResponse = http.post("http://localhost:8080/api/confess", () =>
  HttpResponse.json({ success: true, message: "Success!" })
);

const errorPostResponse = http.post("http://localhost:8080/api/confess", () =>
  HttpResponse.json({ success: false, message: "Fail!" })
);

describe("form details", () => {
  test("renders button and it is disabled", () => {
    render(<Form />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("disabled");
  });

  test("button to be enabled when fields are filled and confirmation given when submitted", async () => {
    server.use(validPostResponse);
    render(<Form />);
    const subject = screen.getByTestId("subject");
    fireEvent.change(subject, {
      target: { value: "i have something to report" },
    });

    const reason = screen.getByTestId("reason");
    fireEvent.change(reason, { target: { value: "united" } });

    const details = screen.getByTestId("details");
    fireEvent.change(details, {
      target: { value: "Citizen 452 loves united and I am reporting them" },
    });

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).not.toHaveAttribute("disabled");

    fireEvent.click(button);
    expect(await screen.findAllByText("Success!")).toBeInTheDocument;
  });

  test("error message is shown if post request fails", async () => {
    server.use(errorPostResponse);
    render(<Form />);
    const subject = screen.getByTestId("subject");
    fireEvent.change(subject, {
      target: { value: "i have something to report" },
    });

    const reason = screen.getByTestId("reason");
    fireEvent.change(reason, { target: { value: "united" } });

    const details = screen.getByTestId("details");
    fireEvent.change(details, {
      target: { value: "Citizen 452 loves united and I am reporting them" },
    });

    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(await screen.findAllByText("Fail!")).toBeInTheDocument;
    expect(
      await screen.findAllByText(
        "An error occured when confessing, please try again."
      )
    ).toBeInTheDocument;
  });

  test("button is disabled when subject is missing", () => {
    render(<Form />);

    const subject = screen.getByTestId("subject");
    fireEvent.change(subject, { target: { value: "I..." } });
    fireEvent.change(subject, { target: { value: "" } });

    const reason = screen.getByTestId("reason");
    fireEvent.change(reason, { target: { value: "united" } });

    const details = screen.getByTestId("details");
    fireEvent.change(details, {
      target: { value: "Citizen 452 loves united and I am reporting them" },
    });

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("disabled");

    const errorMsg = screen.getByText(
      "Subject should be between 1 to 30 characters"
    );
    expect(errorMsg).toBeInTheDocument;
  });

  test("button is disabled when reason is missing", () => {
    render(<Form />);

    const subject = screen.getByTestId("subject");
    fireEvent.change(subject, {
      target: { value: "i have something to report" },
    });

    const reason = screen.getByTestId("reason");
    fireEvent.change(reason, { target: { value: "united" } });
    fireEvent.change(reason, { target: { value: "" } });

    const details = screen.getByTestId("details");
    fireEvent.change(details, {
      target: { value: "Citizen 452 loves united and I am reporting them" },
    });

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("disabled");

    const errorMsg = screen.getByText(
      "Reason should be an option in the select drop down"
    );
    expect(errorMsg).toBeInTheDocument;
  });

  test("button is disabled when details is missing", () => {
    render(<Form />);

    const subject = screen.getByTestId("subject");
    fireEvent.change(subject, {
      target: { value: "i have something to report" },
    });

    const reason = screen.getByTestId("reason");
    fireEvent.change(reason, { target: { value: "united" } });

    const details = screen.getByTestId("details");
    fireEvent.change(details, { target: { value: "some details" } });
    fireEvent.change(details, { target: { value: "" } });

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("disabled");

    const errorMsg = screen.getByText(
      "Detail box should be between 1 to 200 characters"
    );
    expect(errorMsg).toBeInTheDocument;
  });
});
