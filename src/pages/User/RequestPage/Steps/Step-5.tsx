import { Button } from "@components/button/button";
import { Title } from "@components/title/title";
import {
  RequestForm,
  userRequestStepsService,
} from "@services/dashboard/user-request-page/steps";

type Props = {
  form: RequestForm;
  toggleAssistanceType: (value: string) => void;
  showErrors?: boolean;
};

export default function Step5({
  form,
  toggleAssistanceType,
  showErrors,
}: Props) {
  const options = userRequestStepsService.getAssistanceTypeOptions();
  const hasAny = form.assistanceTypes.length > 0;

  return (
    <div className="grid gap-3" dir="rtl">
      <Title level={4} variant="label">
        סוגי סיוע
      </Title>

      <div className="grid gap-2 request-type-grid">
        {options.map((opt) => {
          const isActive = form.assistanceTypes.includes(opt.value);
          return (
            <Button
              key={opt.value}
              variant={isActive ? "primary" : "secondary"}
              size="md"
              onClick={() => toggleAssistanceType(opt.value)}
            >
              {opt.label}
            </Button>
          );
        })}
      </div>

      {showErrors && !hasAny && (
        <div className="request-inline-error">שכחת לבחור פה</div>
      )}
    </div>
  );
}
