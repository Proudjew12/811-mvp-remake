import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import "./button.scss";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isActive?: boolean;
  fullWidth?: boolean;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      isActive = false,
      fullWidth = false,
      className = "",
      disabled,
      type = "button",
      children,
      ...rest
    },
    ref
  ) {
    const classNames = [
      "btn",
      `btn--${variant}`,
      `btn--${size}`,
      fullWidth ? "is-full" : "",
      isLoading ? "is-loading" : "",
      isActive ? "is-active" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type={type}
        className={classNames}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default Button;
