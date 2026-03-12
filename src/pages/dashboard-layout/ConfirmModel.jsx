import React from "react";
import "../dashboard.css";
function ConfirmModal({ message, onConfirm, onCancel, isDanger }) {
  return (
    <div className="pin-overlay">
      <div className="pin-modal">
        <h3 className="settings-message">{message}</h3>
        <p className="settings-message-p" >This action cannot be undone.</p>
        <button
          className="PIN-button"
          onClick={onConfirm}
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '15px',
            backgroundColor: isDanger ? '#e04a4a' : '#0f6f6c',
            color: 'white',
            transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.target.style.backgroundColor = isDanger ? '#c73a3a' : '#0b5653'}
          onMouseLeave={e => e.target.style.backgroundColor = isDanger ? '#e04a4a' : '#0f6f6c'}
        >
          Yes, proceed
        </button>
        <button
          className="PIN-button cancel-button"
          onClick={onCancel}
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '15px'
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
export default ConfirmModal;