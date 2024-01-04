import { Misdemeanour } from "../../types/misdemeanours.types";
import { render, screen } from "@testing-library/react";
import Item from "./item";
const dummyMisdemeanour: Misdemeanour = {
  citizenId: 123,
  misdemeanour: "vegetables",
  date: "22/12/2023",
};

test.only("renders misdeameanours item component", () => {
  const { container } = render(
    <Item misdemeanour={dummyMisdemeanour} key={"123"} imageId={"abcd"} />
  );
  expect(container.getElementsByClassName("table-row").length).toBe(1);
  expect(container.getElementsByClassName("row-item").length).toBe(4);
  expect(screen.getByText(123)).toBeInTheDocument;
  expect(screen.getByText("vegetables 🥗")).toBeInTheDocument;
  expect(screen.getByText("22/12/2023")).toBeInTheDocument;
  expect(screen.getByTestId("mis-image-abcd")).toHaveAttribute("src");
});
