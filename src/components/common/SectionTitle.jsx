import React from "react";
import "./common.css";

const SectionTitle = ({ title }) => {
  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
    </div>
  );
};

export default SectionTitle;