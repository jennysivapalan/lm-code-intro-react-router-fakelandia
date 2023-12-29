const SUBJECT_LENGTH_ERROR = "Subject should be between 1 to 30 characters";

export const validateSubject: (subject: string) => string[] = (subject) => {
  const errorMessages = Array<string>();
  const subjectTrimmed = subject.trim();
  if (subjectTrimmed.length < 1 || subjectTrimmed.length > 30)
    errorMessages.push(SUBJECT_LENGTH_ERROR);
  return errorMessages;
};
