import { ButtonHTMLAttributes } from "react";
import "./button.scss";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
};

export function Button({
  variant = "secondary",
  size = "md",
  fullWidth,
  isLoading,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = [
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? "full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const isDisabled = !!disabled || !!isLoading;

  return (
    <button
      className={classes}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
