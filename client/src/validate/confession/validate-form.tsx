import { MISDEMEANOURS } from "../../types/misdemeanours.types";

const SUBJECT_LENGTH_ERROR = "Subject should be between 1 to 30 characters";
const REASON_ERROR = "Reason should be an option in the select drop down";
const DETAILS_LENGTH_ERROR = "Detail box should be between 1 to 200 characters";

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

export const validateDetails: (details: string) => string[] = (details) => {
  const errorMessages = Array<string>();
  const detailsTrimmed = details.trim();
  if (detailsTrimmed.length < 1 || detailsTrimmed.length > 200)
    errorMessages.push(DETAILS_LENGTH_ERROR);
  return errorMessages;
};
