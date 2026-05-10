import React from 'react';

/**
 * Reusable Tag component for labels, categories, and technology items.
 * 
 * @param {'default' | 'primary' | 'outline'} variant - Visual style
 * @param {boolean} active - For interactive tags (like filters)
 * @param {React.ReactNode} children - Tag content
 * @param {string} className - Additional CSS classes
 */
const Tag = ({ 
  variant = 'default', 
  active = false, 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all";
  
  const variants = {
    default: "bg-negative/5 border-negative/10 text-negative/40",
    primary: "bg-tech-orange/10 border-tech-orange/20 text-tech-orange",
    outline: "bg-transparent border-negative/20 text-negative/60"
  };

  const activeStyles = active 
    ? "bg-tech-orange border-tech-orange text-white shadow-[0_0_15px_rgba(255,95,31,0.2)]" 
    : "";

  return (
    <span 
      className={`${baseStyles} ${variants[variant]} ${activeStyles} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Tag;
