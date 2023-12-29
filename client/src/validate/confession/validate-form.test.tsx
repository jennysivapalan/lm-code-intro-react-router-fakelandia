import { validateSubject } from "./validate-form";

const SUBJECT_LENGTH_ERROR = "Subject should be between 1 to 30 characters";

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
