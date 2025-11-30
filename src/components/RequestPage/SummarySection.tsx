import { ReactNode } from "react";
import { SummarySectionId } from "../../pages/User/RequestPage/UserRequestPage";

type SummarySectionProps = {
  id: SummarySectionId;
  title: string;
  isOpen: boolean;
  onToggle: (id: SummarySectionId) => void;
  children: ReactNode;
};

export function SummarySection({
  id,
  title,
  isOpen,
  onToggle,
  children,
}: SummarySectionProps) {
  return (
    <div className="request-summary-section">
      <button
        type="button"
        className="request-summary-section__header flex"
        onClick={() => onToggle(id)}
      >
        <span>{title}</span>
        <span className="request-summary-section__chevron">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {isOpen && (
        <div className="request-summary-section__body">{children}</div>
      )}
    </div>
  );
}
