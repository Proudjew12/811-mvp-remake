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

export default function Step3({ form, updateField, showErrors }: Props) {
  return (
    <div className="grid gap-3" dir="rtl">
      <Title level={4} variant="label">
        אזור
      </Title>
      <TextField
        value={form.area}
        onChange={(e) => updateField("area", e.target.value)}
        placeholder="התחילו/הקלידו..."
        dir="rtl"
        error={showErrors && !form.area.trim() ? "שכחת למלא פה" : undefined}
      />

      <Title level={4} variant="label">
        עיר
      </Title>
      <TextField
        value={form.city}
        onChange={(e) => updateField("city", e.target.value)}
        placeholder="התחילו/הקלידו..."
        dir="rtl"
        error={showErrors && !form.city.trim() ? "שכחת למלא פה" : undefined}
      />

      <Title level={4} variant="label">
        רחוב
      </Title>
      <TextField
        value={form.street}
        onChange={(e) => updateField("street", e.target.value)}
        placeholder="התחילו/הקלידו..."
        dir="rtl"
        error={showErrors && !form.street.trim() ? "שכחת למלא פה" : undefined}
      />
    </div>
  );
}
