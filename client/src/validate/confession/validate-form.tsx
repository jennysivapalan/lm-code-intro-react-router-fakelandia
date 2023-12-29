import { MISDEMEANOURS } from "../../types/misdemeanours.types";

const SUBJECT_LENGTH_ERROR = "Subject should be between 1 to 30 characters";
const REASON_ERROR = "Reason should be an option in the select drop down";

export const validateSubject: (subject: string) => string[] = (subject) => {
  const errorMessages = Array<string>();
  const subjectTrimmed = subject.trim();
  if (subjectTrimmed.length < 1 || subjectTrimmed.length > 30)
    errorMessages.push(SUBJECT_LENGTH_ERROR);
  return errorMessages;
};

export const validateReason: (reason: string) => string[] = (reason) => {
  const errorMessages = Array<string>();

  if (reason !== "just-talk" && !MISDEMEANOURS.some((m) => m === reason))
    errorMessages.push(REASON_ERROR);
  return errorMessages;
};
