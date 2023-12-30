import { useState, useMemo } from "react";
import { MISDEMEANOURS } from "../../types/misdemeanours.types";
import {
  validateDetails,
  validateReason,
  validateSubject,
} from "../../validate/confession/validate-form";
import ErrorMessages from "./error_messages";

const Form: React.FC = () => {
  const [subject, setSubject] = useState("");
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");

  const isValid = useMemo(
    () =>
      validateSubject(subject).length === 0 &&
      validateReason(reason).length === 0 &&
      validateDetails(details).length === 0,
    [subject, reason, details]
  );

  return (
    <>
      <section className="confession-form">
        <div>
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            name="subject"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <ErrorMessages messages={validateSubject(subject)} />
        </div>
        <div>
          <label htmlFor="reason">Reason for contact:</label>
          <select
            name="reason"
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="">Select</option>
            {MISDEMEANOURS.map((m) => (
              <option value={m}>{m}</option>
            ))}
            <option value="just-talk">I just want to talk</option>
          </select>
          <ErrorMessages messages={validateReason(reason)} />
        </div>

        <div>
          <label htmlFor="details"></label>
          <textarea
            name="details"
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <ErrorMessages messages={validateDetails(details)} />
        <button type="button" disabled={!isValid}>
          Confess
        </button>
      </section>
    </>
  );
};

export default Form;
