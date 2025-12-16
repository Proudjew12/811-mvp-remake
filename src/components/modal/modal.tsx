import React, { ReactNode, useEffect } from "react";
import "./modal.scss";
import Button from "../button/button";

export type ModalSize = "sm" | "md" | "lg";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
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
      className="grid modalBackdrop place-center"
      onClick={onBackdropClick}
      role="presentation"
    >
      <section
        className={`grid modal modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <header className="grid modalHeader">
          {title ? <h2 className="modalTitle">{title}</h2> : <span />}

          <Button type="button" variant="secondary" size="sm" onClick={onClose}>
            ✕
          </Button>
        </header>

        <div className="modalBody">{children}</div>

        {footer && <footer className="grid modalFooter">{footer}</footer>}
      </section>
    </div>
  );
}
