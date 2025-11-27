import { ButtonHTMLAttributes, ReactNode } from "react";
import "./_button.scss";

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

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    isLoading = false,
    isActive = false,
    fullWidth = false,
    className = "",
    disabled,
    children,
    ...rest
  } = props;

  const classes = [
    "app-button",
    `app-button--variant-${variant}`,
    `app-button--size-${size}`,
    fullWidth ? "app-button--fullWidth" : "",
    isLoading ? "app-button--loading" : "",
    isActive ? "app-button--active" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...rest}
    >
      {children}
    </button>
  );
}
