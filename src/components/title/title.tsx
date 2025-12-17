import { ElementType } from "react";
import "./title.scss";

export type TitleVariant = "page" | "section" | "label";

export type TitleProps<T extends ElementType = "h2"> = {
  as?: T;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: TitleVariant;
  className?: string;
  children: React.ReactNode;
};

export function Title<T extends ElementType = "h2">({
  as,
  level = 2,
  variant = "section",
  className = "",
  children,
}: TitleProps<T>) {
  const Tag = (as || (`h${level}` as ElementType)) as ElementType;

  const classes = ["title", `title-${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return <Tag className={classes}>{children}</Tag>;
}

export default Title;
