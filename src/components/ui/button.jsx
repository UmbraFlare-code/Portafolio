import '../../styles/buttons.css';

function Button({ href, variant = 'primary', children }) {
  const buttonClass = `btn ${variant === 'secondary' ? 'btn-secondary' : 'btn-primary'}`;

  return (
    <a
      href={href}
      className={buttonClass}
      role="button"
      tabIndex="0"
    >
      {children}
    </a>
  );
}

export default Button;