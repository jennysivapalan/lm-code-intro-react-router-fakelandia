import { render, screen, fireEvent } from "@testing-library/react";
import MisdemeanoursSelect from "./select";
import { vi } from "vitest";

test("renders select list component and display all in the options", () => {
  const mockOnChange = vi.fn();
  render(
    <MisdemeanoursSelect
      selectedValue="all"
      onChangeSelectedValue={mockOnChange}
    />
  );
  const labelText = screen.getByLabelText("Filter by Misdemeanor");
  expect(labelText).toBeInTheDocument();
  const inputText = screen.getByDisplayValue("all");
  expect(inputText).toBeInTheDocument();
});

describe("onChange functionality", () => {
  test("calls the onChange function in input with correct value", () => {
    const mockOnChange = vi.fn();

    render(
      <MisdemeanoursSelect
        selectedValue="all"
        onChangeSelectedValue={mockOnChange}
      />
    );

    const input = screen.getByLabelText("Filter by Misdemeanor");
    fireEvent.change(input, { target: { value: "united" } });
    expect(mockOnChange).toHaveBeenCalledWith("united");
  });

  test("calls the onChange function ignores values not in the option list", () => {
    const mockOnChange = vi.fn();
    render(
      <MisdemeanoursSelect
        selectedValue="all"
        onChangeSelectedValue={mockOnChange}
      />
    );
    const input = screen.getByLabelText("Filter by Misdemeanor");
    fireEvent.change(input, { target: { value: "loving-life" } });
    expect(mockOnChange).toHaveBeenCalledWith("");
  });
});
