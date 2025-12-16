import { ReactNode } from "react";
import "./card.scss";

export type CardVariant = "default" | "soft" | "outline";

export interface CardProps {
  children?: ReactNode;
  variant?: CardVariant;
  className?: string;
}

export function Card({
  children,
  variant = "default",
  className = "",
}: CardProps) {
  return (
    <div
      className={["card", `card--${variant}`, className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

export default Card;
