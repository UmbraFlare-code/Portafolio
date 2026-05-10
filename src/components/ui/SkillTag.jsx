import React from 'react';

/**
 * Standardized skill/technology tag button used across all sections.
 *
 * @param {string}  label     — Tag text
 * @param {'sm'|'md'} size    — Visual size variant (default 'sm')
 * @param {boolean} active    — Whether the tag is actively selected
 * @param {function} onClick  — Optional click handler (makes it interactive)
 */
const SkillTag = ({ label, size = 'sm', active = false, onClick }) => {
  const sizeClasses = {
    sm: 'text-[9px] px-2 py-0.5',
    md: 'text-[10px] px-3 py-1',
  };

  const baseClasses = `inline-flex items-center gap-1 rounded-full font-bold uppercase tracking-wider border transition-all duration-200 ${sizeClasses[size]}`;

  const colorClasses = active
    ? 'bg-tech-orange border-tech-orange text-white'
    : 'bg-tech-orange/5 border-tech-orange/15 text-tech-orange/80 hover:border-tech-orange/40';

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClasses} ${colorClasses} cursor-pointer`}
      >
        {label}
      </button>
    );
  }

  return (
    <span className={`${baseClasses} ${colorClasses}`}>
      {label}
    </span>
  );
};

export default SkillTag;
