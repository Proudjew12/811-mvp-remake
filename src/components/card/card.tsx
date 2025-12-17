import { ReactNode } from "react";
import "./card.scss";

export type CardVariant = "outline" | "solid";

export type CardProps = {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
};

export function Card({
  children,
  className = "",
  variant = "solid",
}: CardProps) {
  const classes = ["card", `card-${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}

export default Card;
