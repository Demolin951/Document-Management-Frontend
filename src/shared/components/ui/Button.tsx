import type { ButtonProps } from "./types/buttonTypes";

function Button({ children, type = "button", className = "", ...buttonProps }: ButtonProps) {
  return (
    <button
      type={type}
      className={`rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export default Button;
