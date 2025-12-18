import { TextField } from "@components/text-field/text-field";
import { Title } from "@components/title/title";
import { RequestForm } from "@/services/user/user-request-page/steps";

type Props = {
  form: RequestForm;
  updateField: <K extends keyof RequestForm>(
    key: K,
    value: RequestForm[K]
  ) => void;
  showErrors?: boolean;
};

export default function Step7({ form, updateField }: Props) {
  return (
    <div className="grid gap-3" dir="rtl">
      <Title level={4} variant="label">
        כותרת הבקשה
      </Title>
      <TextField
        value={form.requestTitle}
        onChange={(e) => updateField("requestTitle", e.target.value)}
        placeholder="התחילו/הקלידו..."
        dir="rtl"
      />

      <Title level={4} variant="label">
        מה עוד כדאי לדעת?
      </Title>
      <TextField
        multiline
        rows={6}
        value={form.moreInfo}
        onChange={(e) => updateField("moreInfo", e.target.value)}
        placeholder="התחילו/הקלידו..."
        dir="rtl"
      />
    </div>
  );
}
