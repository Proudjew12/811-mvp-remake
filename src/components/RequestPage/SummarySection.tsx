import { ReactNode } from "react";
import "./SummarySection.scss";
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
    <div className="summarySection">
      <button
        type="button"
        className="grid summaryHeader"
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
      >
        <span className="summaryHeaderTitle">{title}</span>
        <span className="summaryHeaderChevron" aria-hidden>
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {isOpen && <div className="summaryBody">{children}</div>}
    </div>
  );
}
