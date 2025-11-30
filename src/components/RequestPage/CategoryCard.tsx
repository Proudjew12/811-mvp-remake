import { AssistanceCategoryId } from "../../services/RequestPage/UserRequestPage.service";

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
  const className =
    "request-category-card" +
    (isActive ? " request-category-card--active" : "");

  return (
    <button type="button" className={className} onClick={() => onToggle(id)}>
      <div className="request-category-card__title">{label}</div>
    </button>
  );
}
