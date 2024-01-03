import { useState, useMemo } from "react";
import {
  MISDEMEANOURS,
  MisdemeanourKind,
} from "../../types/misdemeanours.types";
import { addMisdemeanour } from "../../service/new-confessions";
import {
  validateDetails,
  validateReason,
  validateSubject,
} from "../../validate/confession/validate-form";
import ErrorMessages from "./error_messages";
import { postConfession } from "../../service/new-confessions";
import { ConfessionPostResponse } from "../../types/confessions.types";
const Form: React.FC = () => {
  const [subject, setSubject] = useState("");
  const [showSubjectError, setShowSubjectErrorComponent] = useState(false);
  const [reason, setReason] = useState("");
  const [showReasonError, setShowReasonErrorComponent] = useState(false);
  const [details, setDetails] = useState("");
  const [showDetailsError, setShowDetailsErrorComponent] = useState(false);

  const [data, setData] = useState<ConfessionPostResponse>({
    success: null,
    message: "",
  });

  const isValid = useMemo(
    () =>
      validateSubject(subject).length === 0 &&
      validateReason(reason).length === 0 &&
      validateDetails(details).length === 0,
    [subject, reason, details]
  );

  async function submitConfession() {
    const data = await postConfession(subject, reason, details);
    setData(data);
    if (checkIsMisdemeanour(reason))
      addMisdemeanour(reason as MisdemeanourKind);
  }

  function checkIsMisdemeanour(value: unknown) {
    return (
      typeof value === "string" &&
      MISDEMEANOURS.some((misdemeanour) => value === misdemeanour)
    );
  }

  function toggleValidateAndChangeSubject(value: string) {
    setShowSubjectErrorComponent(true);
    setSubject(value);
  }

  function toggleValidateAndChangeReason(value: string) {
    setShowReasonErrorComponent(true);
    setReason(value);
  }

  function toggleValidateAndChangeDetails(value: string) {
    setShowDetailsErrorComponent(true);
    setDetails(value);
  }

  return (
    <>
      <section className="confession-form">
        {showSubjectError && (
          <ErrorMessages
            messages={validateSubject(subject)}
            key="subject-error"
          />
        )}
        {showReasonError && (
          <ErrorMessages messages={validateReason(reason)} key="reason-error" />
        )}
        {showDetailsError && (
          <ErrorMessages
            messages={validateDetails(details)}
            key="details-error"
          />
        )}
        <div>
          <label htmlFor="subject">Subject: </label>
          <input
            type="text"
            name="subject"
            id="subject"
            data-testid="subject"
            value={subject}
            onChange={(e) => toggleValidateAndChangeSubject(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="reason">Reason for contact: </label>
          <select
            name="reason"
            id="reason"
            data-testid="reason"
            className="reason-select"
            value={reason}
            onChange={(e) => toggleValidateAndChangeReason(e.target.value)}
          >
            <option value="">Select</option>
            {MISDEMEANOURS.map((m) => (
              <option value={m} key={m}>
                {m}
              </option>
            ))}
            <option value="just-talk">I just want to talk</option>
          </select>
        </div>
        <div>
          <label htmlFor="details"></label>
          <textarea
            name="details"
            id="details"
            value={details}
            data-testid="details"
            onChange={(e) => toggleValidateAndChangeDetails(e.target.value)}
          />
        </div>
        <button
          type="button"
          disabled={!isValid}
          onClick={() => submitConfession()}
        >
          Confess
        </button>
        <div>{data.message}</div>
        {data.success === false && (
          <div>An error occured when confessing, please try again.</div>
        )}
      </section>
    </>
  );
};

export default Form;
