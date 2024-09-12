import React from "react";
import "./Modal.css";

function Modal({ children, onClose }) {
  return (
    <div id="Modal">
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="modal-close-button" onClick={onClose}>
            X
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
