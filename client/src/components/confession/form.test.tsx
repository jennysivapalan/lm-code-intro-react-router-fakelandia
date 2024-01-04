import Form from "./form";
import { render, screen, fireEvent } from "@testing-library/react";

describe("form details", () => {
  test("renders button and it is disabled", () => {
    render(<Form />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("disabled");
  });

  test("button to be enabled when fields are filled", () => {
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
