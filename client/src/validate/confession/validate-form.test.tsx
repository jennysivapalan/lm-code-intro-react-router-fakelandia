import { validateSubject, validateReason } from "./validate-form";

const SUBJECT_LENGTH_ERROR = "Subject should be between 1 to 30 characters";
const REASON_ERROR = "Reason should be an option in the select drop down";

describe("valid subject field", () => {
  test("subject should be valid", () => {
    expect(validateSubject("I need to confess something")).toEqual([]);

    const longSubject = Array(30).fill("a").join("");
    expect(validateSubject(longSubject)).toEqual([]);
  });

  test("subject should be between 1 to 30 characters", () => {
    expect(validateSubject("")).toEqual([SUBJECT_LENGTH_ERROR]);
    expect(validateSubject("      ")).toEqual([SUBJECT_LENGTH_ERROR]);

    const longSubject = Array(31).fill("b").join("");
    expect(validateSubject(longSubject)).toEqual([SUBJECT_LENGTH_ERROR]);
  });
});

describe("valid reason field", () => {
  test("reason should be valid", () => {
    expect(validateReason("vegetables")).toEqual([]);
    expect(validateReason("united")).toEqual([]);
    expect(validateReason("lift")).toEqual([]);
    expect(validateReason("rudeness")).toEqual([]);
    expect(validateReason("just-talk")).toEqual([]);
  });

  test("reason should throw an error if not a misdeameanor or just-talk option", () => {
    expect(validateReason("wahoo")).toEqual([REASON_ERROR]);
  });
});
