import React, { ChangeEvent } from "react";
import "./text-field.scss";

type BaseProps = {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  dir?: "ltr" | "rtl";
  className?: string;
};

type TextFieldProps =
  | (BaseProps & {
      multiline?: false;
      type?: React.HTMLInputTypeAttribute;
      rows?: never;
    })
  | (BaseProps & {
      multiline: true;
      type?: never;
      rows?: number;
    });

export function TextField(props: TextFieldProps) {
  const {
    id,
    name,
    label,
    placeholder,
    value,
    onChange,
    required,
    disabled,
    error,
    helperText,
    dir,
    className = "",
  } = props;

  const baseId = id || name;
  const errorId = error && baseId ? `${baseId}-error` : undefined;
  const helperId = helperText && baseId ? `${baseId}-helper` : undefined;

  const commonProps = {
    id: baseId,
    name,
    value,
    onChange,
    placeholder,
    required,
    disabled,
    dir,
    "aria-invalid": !!error || undefined,
    "aria-describedby":
      [errorId, helperId].filter(Boolean).join(" ") || undefined,
  };

  return (
    <div
      className={["field", error ? "is-error" : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      {label && (
        <label className="field-label" htmlFor={baseId}>
          {label}
          {required && <span className="field-required">*</span>}
        </label>
      )}

      <div className="field-control">
        {"multiline" in props && props.multiline ? (
          <textarea
            className="field-input field-textarea"
            rows={props.rows ?? 3}
            {...commonProps}
          />
        ) : (
          <input
            className="field-input"
            type={props.type ?? "text"}
            {...commonProps}
          />
        )}
      </div>

      {helperText && !error && (
        <p id={helperId} className="field-helper" aria-live="polite">
          {helperText}
        </p>
      )}

      {error && (
        <p id={errorId} className="field-error" aria-live="assertive">
          {error}
        </p>
      )}
    </div>
  );
}

export default TextField;
