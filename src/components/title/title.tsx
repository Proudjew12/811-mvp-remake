// src/components/title/title.tsx
import { ElementType, ReactNode } from "react";
import "./title.scss";

type TitleLevel = 1 | 2 | 3 | 4;
type TitleVariant = "page" | "section" | "label";

type TitleProps = {
  level?: TitleLevel;
  variant?: TitleVariant;
  children: ReactNode;
  className?: string;
};

export default function Title({
  level = 2,
  variant = "section",
  children,
  className = "",
}: TitleProps) {
  // h1 / h2 / h3 / h4 – typed via ElementType instead of JSX.IntrinsicElements
  const Tag = `h${level}` as ElementType;

  return (
    <Tag className={`ui-heading ui-heading--${variant} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
