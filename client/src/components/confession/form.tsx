import { useState } from "react";
import { MISDEMEANOURS } from "../../types/misdemeanours.types";
import {
  validateReason,
  validateSubject,
} from "../../validate/confession/validate-form";
import ErrorMessages from "./error_messages";

const Form: React.FC = () => {
  const [subject, setSubject] = useState("");
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");

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
          <textarea name="details" id="details" value={details} />
        </div>
        <button type="button">Confess</button>
      </section>
    </>
  );
};

export default Form;
