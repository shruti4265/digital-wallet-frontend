import React from "react";
import "../dashboard.css";
function AmountInput({ amount, setamount, setAmountPinPopup, setShowAmountPopup }) {

  return (
    <div className="pin-overlay">
      <div className="pin-modal">

        <h2>Enter your Amount</h2>

        <input
          className="PIN-input"
          placeholder="Enter your Amount"
          value={amount}
          onChange={(e) => setamount(e.target.value)}
        />

        <button className="PIN-button verify-button" onClick={() => {
          setAmountPinPopup(true);
          setShowAmountPopup(false);
        }}>
          Enter
        </button>

        <button className="PIN-button cancel-button" onClick={() => {
            setShowAmountPopup(false);
        }}>
          Cancel
        </button>

      </div>
    </div>
  );
}

export default AmountInput;