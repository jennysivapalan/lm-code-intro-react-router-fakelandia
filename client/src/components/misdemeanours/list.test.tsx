import { Misdemeanour } from "../../types/misdemeanours.types";
import MisdemeanoursList from "./list";

import { render } from "@testing-library/react";

const dummyMisdemeanours: Misdemeanour[] = [
  {
    citizenId: 123,
    misdemeanour: "vegetables",
    date: "22/12/2023",
  },
  {
    citizenId: 345,
    misdemeanour: "rudeness",
    date: "22/12/2023",
  },
];

test("renders misdeameanours list component", () => {
  const { container } = render(
    <MisdemeanoursList misdemeanours={dummyMisdemeanours} />
  );
  expect(container.getElementsByClassName("misdeameanours-list").length).toBe(
    1
  );
  expect(container.getElementsByClassName("misdeameanour-item").length).toBe(2);
});
