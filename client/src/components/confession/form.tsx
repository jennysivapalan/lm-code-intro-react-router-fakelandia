import { useState } from "react";
import { MISDEMEANOURS } from "../../types/misdemeanours.types";

const Form: React.FC = () => {
  const [subject, setSubject] = useState("");
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");

  return (
    <>
      <section className="confession-form">
        <div>
          <label htmlFor="subject">Subject</label>
          <input type="text" name="subject" id="subject" value={subject} />
        </div>
        <div>
          <label htmlFor="reason">Reason for contact:</label>
          <select name="reason" id="reason" value={reason}>
            <option value="">Select</option>
            {MISDEMEANOURS.map((m) => (
              <option value="m">{m}</option>
            ))}
            <option value="just-talk">I just want to talk</option>
          </select>
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
