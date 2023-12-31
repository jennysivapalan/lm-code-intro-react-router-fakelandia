import { useState, useMemo } from "react";
import { MISDEMEANOURS } from "../../types/misdemeanours.types";
import {
  validateDetails,
  validateReason,
  validateSubject,
} from "../../validate/confession/validate-form";
import ErrorMessages from "./error_messages";
import { json } from "stream/consumers";

const Form: React.FC = () => {
  const [subject, setSubject] = useState("");
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const isValid = useMemo(
    () =>
      validateSubject(subject).length === 0 &&
      validateReason(reason).length === 0 &&
      validateDetails(details).length === 0,
    [subject, reason, details]
  );

  async function submitConfession() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: subject,
        reason: reason,
        details: details,
      }),
    };
    const response = await fetch(
      "http://localhost:8080/api/confess",
      requestOptions
    );
    const data = await response.json();
    setResponseMessage(data.message);
  }

  return (
    <>
      <section className="confession-form">
        <ErrorMessages messages={validateSubject(subject)} />
        <ErrorMessages messages={validateReason(reason)} />
        <ErrorMessages messages={validateDetails(details)} />

        <div>
          <label htmlFor="subject">Subject: </label>
          <input
            type="text"
            name="subject"
            id="subject"
            data-testid="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="reason">Reason for contact: </label>
          <select
            name="reason"
            id="reason"
            data-testid="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="">Select</option>
            {MISDEMEANOURS.map((m) => (
              <option value={m}>{m}</option>
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
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <button
          type="button"
          disabled={!isValid}
          onClick={() => submitConfession()}
        >
          Confess
        </button>
        <div>{responseMessage}</div>
      </section>
    </>
  );
};

export default Form;
