import React from "react";
import "../dashboard.css";

function PinCheck({ pin, setPin, onVerify, setPopup }) {

  return (
    <div className="pin-overlay">
      <div className="pin-modal">

        <h2>Enter Your PIN</h2>

        <input
          className="PIN-input"
          type="password"
          placeholder="Enter your PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />

        <button className="PIN-button verify-button" onClick={onVerify}>
          Enter
        </button>

        <button className="PIN-button cancel-button" onClick={() => setPopup(false)}>
          Cancel
        </button>

      </div>
    </div>
  );
}

export default PinCheck;