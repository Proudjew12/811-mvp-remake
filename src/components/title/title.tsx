import { ElementType, ReactNode } from "react";
import "./title.scss";

export type TitleLevel = 1 | 2 | 3 | 4;
export type TitleVariant = "page" | "section" | "label";

export type TitleProps = {
  level?: TitleLevel;
  variant?: TitleVariant;
  children: ReactNode;
  className?: string;
};

export function Title({
  level = 2,
  variant = "section",
  children,
  className = "",
}: TitleProps) {
  const Tag = `h${level}` as ElementType;

  const classes = ["title", `title--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return <Tag className={classes}>{children}</Tag>;
}

export default Title;
