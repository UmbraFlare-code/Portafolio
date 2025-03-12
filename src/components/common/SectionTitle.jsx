import React from "react";

const SectionTitle = ({ title }) => {
  return (
    <div className="section-header">
      <h2 className="section-title" style={{ fontSize: '28px' }}>{title}</h2>
    </div>
  );
};

export default SectionTitle;