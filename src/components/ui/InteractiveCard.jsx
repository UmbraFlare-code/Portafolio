import React from 'react';

/**
 * A wrapper component that adds a premium hover effect to cards,
 * indicating interactivity and differentiating them from static content.
 */
const InteractiveCard = ({ children, className = '', onClick, ...props }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        relative group cursor-pointer
        transition-all duration-300 ease-out
        hover:translate-y-[-4px]
        ${className}
      `}
      {...props}
    >
      {/* Glow effect background */}
      <div className="absolute -inset-2 bg-gradient-to-r from-tech-orange/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl z-0" />
      
      {/* The actual card content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Interaction indicator (subtle border glow) */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-tech-orange/30 transition-colors pointer-events-none z-20" />
    </div>
  );
};

export default InteractiveCard;
