import React from "react";
import "../dashboard.css";
function EmailInput({ email, setemail, setPinPopup, setEmailPopup }) {

  return (
    <div className="pin-overlay">
      <div className="pin-modal">

        <h2>Enter Email</h2>

        <input
          className="PIN-input"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />

        <button className="PIN-button verify-button" onClick={() => {
          setPinPopup(true);
          setEmailPopup(false);
        }}>
          Send
        </button>

        <button className="PIN-button cancel-button" onClick={() => {
            setEmailPopup(false);
        }}>
          Cancel
        </button>

      </div>
    </div>
  );
}

export default EmailInput;