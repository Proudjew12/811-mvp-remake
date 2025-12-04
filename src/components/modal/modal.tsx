import { ReactNode, useEffect } from "react";
import "./modal.scss";
import Button from "../button/button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(ev: KeyboardEvent) {
      if (ev.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function onBackdropClick(ev: React.MouseEvent<HTMLDivElement>) {
    if (ev.target === ev.currentTarget) onClose();
  }

  return (
    <div
      className="ui-modal-backdrop flex align-center justify-center"
      onClick={onBackdropClick}
      role="presentation"
    >
      <section
        className={`ui-modal ui-modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <header className="ui-modal__header flex justify-between align-center">
          {title && <h2 className="ui-modal__title">{title}</h2>}

          <Button type="button" variant="secondary" size="sm" onClick={onClose}>
            ✕
          </Button>
        </header>

        <div className="ui-modal__body">{children}</div>

        {footer && (
          <footer className="ui-modal__footer flex justify-end">
            {footer}
          </footer>
        )}
      </section>
    </div>
  );
}
