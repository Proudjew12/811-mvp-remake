import { AssistanceCategoryId } from "../../services/RequestPage/UserRequestPage.service";
import "./CategoryCard.scss";

type CategoryCardProps = {
  id: AssistanceCategoryId;
  label: string;
  isActive: boolean;
  onToggle: (id: AssistanceCategoryId) => void;
};

export function CategoryCard({
  id,
  label,
  isActive,
  onToggle,
}: CategoryCardProps) {
  const className = ["categoryCard", isActive ? "isActive" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={className} onClick={() => onToggle(id)}>
      <div className="categoryCardTitle">{label}</div>
    </button>
  );
}
