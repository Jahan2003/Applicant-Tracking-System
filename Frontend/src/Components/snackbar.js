import React, { useState, useEffect } from "react";
import "../Assets/Styles/snackbar.css";

function Snackbar({ message, type, open, onClose }) {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    setVisible(open);
  }, [open]);

  useEffect(() => {
    let timeout;
    if (visible) {
      timeout = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 3000); // Snackbar duration in milliseconds (adjust as needed)
    }

    return () => clearTimeout(timeout);
  }, [visible, onClose]);

  return (
    <div className={`snackbar ${type} ${visible ? "show" : ""}`}>
      {message}
    </div>
  );
}

export default Snackbar;
