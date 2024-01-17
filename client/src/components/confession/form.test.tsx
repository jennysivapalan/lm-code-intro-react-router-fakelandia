import Form from "./form";
import { render, screen, fireEvent } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";

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
    const user = userEvent.setup();

    render(<Form />);
    const subject = screen.getByTestId("subject");
    await user.type(subject, "i have something to report");

    const reason = screen.getByTestId("reason");
    await user.selectOptions(reason, "united");

    const details = screen.getByTestId("details");

    await user.type(
      details,
      "Citizen 452 loves united and I am reporting them"
    );

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).not.toHaveAttribute("disabled");

    await user.click(button);

    expect(await screen.findAllByText("Success!")).toBeInTheDocument;
  });

  test("error message is shown if post request fails", async () => {
    server.use(errorPostResponse);
    const user = userEvent.setup();

    render(<Form />);
    const subject = screen.getByTestId("subject");
    await user.type(subject, "i have something to report");

    const reason = screen.getByTestId("reason");
    await user.selectOptions(reason, "united");

    const details = screen.getByTestId("details");
    await user.type(
      details,
      "Citizen 452 loves united and I am reporting them"
    );

    const button = screen.getByRole("button");

    await user.click(button);
    expect(await screen.findAllByText("Fail!")).toBeInTheDocument;
    expect(
      await screen.findAllByText(
        "An error occured when confessing, please try again."
      )
    ).toBeInTheDocument;
  });

  test("button is disabled when subject is missing", async () => {
    render(<Form />);
    const user = userEvent.setup();

    const subject = screen.getByTestId("subject");
    await user.type(subject, "I...");
    fireEvent.change(subject, { target: { value: "" } }); //user.type with empty string causes an error

    const reason = screen.getByTestId("reason");
    await user.selectOptions(reason, "united");

    const details = screen.getByTestId("details");
    await user.type(
      details,
      "Citizen 452 loves united and I am reporting them"
    );

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("disabled");

    const errorMsg = screen.getByText(
      "Subject should be between 1 to 30 characters"
    );
    expect(errorMsg).toBeInTheDocument;
  });

  test("button is disabled when reason is missing", async () => {
    const user = userEvent.setup();

    render(<Form />);

    const subject = screen.getByTestId("subject");

    await user.type(subject, "i have something to report");

    const reason = screen.getByTestId("reason");
    await user.selectOptions(reason, "united");
    await user.selectOptions(reason, "");

    const details = screen.getByTestId("details");
    await user.type(
      details,
      "Citizen 452 loves united and I am reporting them"
    );

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("disabled");

    const errorMsg = screen.getByText(
      "Reason should be an option in the select drop down"
    );
    expect(errorMsg).toBeInTheDocument;
  });

  test("button is disabled when details is missing", async () => {
    const user = userEvent.setup();

    render(<Form />);

    const subject = screen.getByTestId("subject");
    await user.type(subject, "i have something to report");

    const reason = screen.getByTestId("reason");
    await user.selectOptions(reason, "united");

    const details = screen.getByTestId("details");
    await user.type(
      details,
      "Citizen 452 loves united and I am reporting them"
    );
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
