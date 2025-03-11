import React from "react";
import "./Button.css";

const ModularButton = ({ id, label, onClick, icon, className, position }) => {
  const buttonClasses = `modular-button ${className || ""} ${position || ""}`;
  
  return (
    <button id={id} className={buttonClasses} onClick={onClick}>
      {icon && <span className="button-icon">{icon}</span>}
      {label && <span className="button-label">{label}</span>}
    </button>
  );
};

export default ModularButton;
