import { ReactNode } from "react";
import "./card.scss";

type CardVariant = "default" | "soft" | "accent";

type CardProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
  bodyClassName?: string;
};

export default function Card({
  title,
  subtitle,
  actions,
  children,
  variant = "default",
  className = "",
  bodyClassName = "",
}: CardProps) {
  const hasHeader = title || subtitle || actions;

  return (
    <section className={`ui-card ui-card--${variant} ${className}`.trim()}>
      {hasHeader && (
        <header className="ui-card__header flex justify-between align-center">
          <div className="ui-card__header-main">
            {title && <h2 className="ui-card__title">{title}</h2>}
            {subtitle && <p className="ui-card__subtitle">{subtitle}</p>}
          </div>
          {actions && <div className="ui-card__actions">{actions}</div>}
        </header>
      )}

      <div className={`ui-card__body ${bodyClassName}`.trim()}>{children}</div>
    </section>
  );
}
