import { useMemo } from "react";
import { Dropdown, type Option } from "@components/dropdown/dropdown";
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

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

const PHONE_PREFIX_OPTIONS: Option[] = [
  { value: "050", label: "050" },
  { value: "051", label: "051" },
  { value: "052", label: "052" },
  { value: "053", label: "053" },
  { value: "054", label: "054" },
  { value: "055", label: "055" },
  { value: "056", label: "056" },
  { value: "058", label: "058" },
  { value: "059", label: "059" },

  { value: "02", label: "02" },
  { value: "03", label: "03" },
  { value: "04", label: "04" },
  { value: "08", label: "08" },
  { value: "09", label: "09" },

  { value: "070", label: "070" },
  { value: "071", label: "071" },
  { value: "072", label: "072" },
  { value: "073", label: "073" },
  { value: "074", label: "074" },
  { value: "076", label: "076" },
  { value: "077", label: "077" },
  { value: "079", label: "079" },
];

function splitPhone(full: string) {
  const digits = onlyDigits(full);

  const p3 = digits.slice(0, 3);
  if (/^(05[0-689]|07[0-479])$/.test(p3)) {
    return { prefix: p3, rest: digits.slice(3) };
  }

  const p2 = digits.slice(0, 2);
  if (/^(02|03|04|08|09)$/.test(p2)) {
    return { prefix: p2, rest: digits.slice(2) };
  }

  return { prefix: "", rest: digits };
}

function buildPhone(prefix: string, rest: string) {
  return `${onlyDigits(prefix)}${onlyDigits(rest)}`;
}

export default function Step1({ form, updateField, showErrors }: Props) {
  const phoneParts = useMemo(() => splitPhone(form.phone), [form.phone]);

  const prefixDigits = onlyDigits(phoneParts.prefix);
  const restDigits = onlyDigits(phoneParts.rest).slice(0, 7);

  const fullDigits = `${prefixDigits}${restDigits}`;
  const prefixSelected = prefixDigits.length > 0;

  const fullLenOk = fullDigits.length >= 8 && fullDigits.length <= 10;

  const phoneError =
    showErrors && (!prefixSelected || !fullLenOk) ? "שכחת למלא פה" : undefined;

  function onPrefixChange(nextPrefix: string) {
    if (!nextPrefix) return;
    updateField("phone", buildPhone(nextPrefix, restDigits));
  }

  function onRestChange(raw: string) {
    const next = onlyDigits(raw).slice(0, 7);
    updateField("phone", buildPhone(prefixDigits, next));
  }

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
        error={
          showErrors && !form.requestTitle.trim() ? "שכחת למלא פה" : undefined
        }
      />

      <Title level={4} variant="label">
        שם מקבל הסיוע
      </Title>
      <TextField
        value={form.receiverName}
        onChange={(e) => updateField("receiverName", e.target.value)}
        placeholder="התחילו/הקלידו..."
        dir="rtl"
        error={
          showErrors && !form.receiverName.trim() ? "שכחת למלא פה" : undefined
        }
      />

      <Title level={4} variant="label">
        מספר טלפון
      </Title>

      <div className="grid items-center gap-2 request-phone-row" dir="ltr">
        <Dropdown
          value={phoneParts.prefix}
          onChange={(e) => onPrefixChange(e.target.value)}
          options={PHONE_PREFIX_OPTIONS}
          placeholder="בחרו קידומת..."
          dir="ltr"
          error={showErrors && !prefixSelected ? "שכחת לבחור פה" : undefined}
        />

        <span className="request-phone-dash" aria-hidden="true">
          -
        </span>

        <TextField
          value={restDigits}
          onChange={(e) => onRestChange(e.target.value)}
          placeholder="המשך מספר..."
          dir="ltr"
          type="tel"
          error={phoneError}
          helperText="סה״כ (כולל קידומת) חייב להיות 8–10 ספרות"
        />
      </div>
    </div>
  );
}
