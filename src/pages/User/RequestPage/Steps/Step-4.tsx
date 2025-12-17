import { TextField } from "@components/text-field/text-field";
import { Title } from "@components/title/title";
import { RequestForm } from "@services/dashboard/user-request-page/steps";

type Props = {
  form: RequestForm;
  updateField: <K extends keyof RequestForm>(
    key: K,
    value: RequestForm[K]
  ) => void;
  showErrors?: boolean;
};

export default function Step4({ form, updateField, showErrors }: Props) {
  return (
    <div className="grid gap-3" dir="rtl">
      <div className="grid gap-3 request-datetime-grid">
        <div className="grid gap-2">
          <Title level={4} variant="label">
            תאריך התחלה
          </Title>
          <TextField
            value={form.startDate}
            onChange={(e) => updateField("startDate", e.target.value)}
            dir="ltr"
            type="date"
            error={showErrors && !form.startDate ? "שכחת למלא פה" : undefined}
          />
        </div>

        <div className="grid gap-2">
          <Title level={4} variant="label">
            שעת התחלה
          </Title>
          <TextField
            value={form.startTime}
            onChange={(e) => updateField("startTime", e.target.value)}
            dir="ltr"
            type="time"
            error={showErrors && !form.startTime ? "שכחת למלא פה" : undefined}
          />
        </div>

        <div className="grid gap-2">
          <Title level={4} variant="label">
            תאריך סיום
          </Title>
          <TextField
            value={form.endDate}
            onChange={(e) => updateField("endDate", e.target.value)}
            dir="ltr"
            type="date"
            error={showErrors && !form.endDate ? "שכחת למלא פה" : undefined}
          />
        </div>

        <div className="grid gap-2">
          <Title level={4} variant="label">
            שעת סיום
          </Title>
          <TextField
            value={form.endTime}
            onChange={(e) => updateField("endTime", e.target.value)}
            dir="ltr"
            type="time"
            error={showErrors && !form.endTime ? "שכחת למלא פה" : undefined}
          />
        </div>
      </div>
    </div>
  );
}
