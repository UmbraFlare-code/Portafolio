import React from 'react';

/**
 * Reusable Button component with different visual variants.
 * 
 * @param {'primary' | 'secondary' | 'outline' | 'ghost'} variant - Visual style
 * @param {'sm' | 'md' | 'lg'} size - Component size
 * @param {boolean} fullWidth - Whether the button should take all available width
 * @param {React.ReactNode} children - Button content
 * @param {string} className - Additional CSS classes
 */
const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-bold uppercase tracking-wider transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-xl";
  
  const variants = {
    primary: "bg-tech-orange text-white hover:shadow-[0_0_30px_rgba(255,95,31,0.3)] hover:bg-tech-orange/90",
    secondary: "bg-negative/5 border border-negative/10 text-negative/60 hover:bg-negative/10 hover:text-negative",
    outline: "border border-tech-orange/50 text-tech-orange hover:bg-tech-orange/10",
    ghost: "bg-transparent text-negative/40 hover:bg-negative/5 hover:text-negative"
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-6 py-3 text-xs",
    lg: "px-8 py-4 text-sm"
  };

  const width = fullWidth ? "w-full" : "w-fit";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
