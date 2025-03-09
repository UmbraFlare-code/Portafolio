import React from "react";

const ModularButton = ({ id, label, onClick }) => {
  return (
    <button id={id} onClick={onClick}>
      {label}
    </button>
  );
};

export default ModularButton;
