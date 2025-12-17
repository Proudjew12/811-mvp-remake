import { Dropdown } from "@components/dropdown/dropdown";
import { TextField } from "@components/text-field/text-field";
import { Title } from "@components/title/title";
import {
  RequestForm,
  userRequestStepsService,
} from "@services/dashboard/user-request-page/steps";

type Props = {
  form: RequestForm;
  updateField: <K extends keyof RequestForm>(
    key: K,
    value: RequestForm[K]
  ) => void;
  showErrors?: boolean;
};

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export default function Step2({ form, updateField, showErrors }: Props) {
  const urgency = userRequestStepsService.getUrgencyOptions();

  const peopleDigits = onlyDigits(form.helpedPeopleCount);
  const volunteersDigits = onlyDigits(form.volunteersNeeded);

  return (
    <div className="grid gap-3" dir="rtl">
      <Title level={4} variant="label">
        לכמה אנשים מיועד הסיוע?
      </Title>
      <TextField
        value={peopleDigits}
        onChange={(e) =>
          updateField("helpedPeopleCount", onlyDigits(e.target.value))
        }
        placeholder="התחילו/הקלידו..."
        dir="rtl"
        type="tel"
        error={showErrors && !peopleDigits ? "שכחת למלא פה" : undefined}
      />

      <Title level={4} variant="label">
        האם נדרשים מתנדבים? אם כן, כמה?
      </Title>
      <TextField
        value={volunteersDigits}
        onChange={(e) =>
          updateField("volunteersNeeded", onlyDigits(e.target.value))
        }
        placeholder="אופציונלי"
        dir="rtl"
        type="tel"
      />

      <Dropdown
        value={form.urgency}
        onChange={(e) => updateField("urgency", e.target.value)}
        options={urgency}
        label="עד כמה הבקשה דחופה?"
        dir="rtl"
        error={showErrors && !form.urgency ? "שכחת למלא פה" : undefined}
      />
    </div>
  );
}
