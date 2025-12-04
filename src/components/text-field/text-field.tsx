import { ChangeEvent } from "react";
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

export default function TextField(props: TextFieldProps) {
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

  const errorId = error ? `${id || name}-error` : undefined;
  const helperId = helperText ? `${id || name}-helper` : undefined;

  const commonProps = {
    id,
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
      className={`ui-field ${
        error ? "ui-field--error" : ""
      } ${className}`.trim()}
    >
      {label && (
        <label className="ui-field__label" htmlFor={id || name}>
          {label}
          {required && <span className="ui-field__required">*</span>}
        </label>
      )}

      <div className="ui-field__control">
        {"multiline" in props && props.multiline ? (
          <textarea
            className="ui-field__textarea"
            rows={props.rows ?? 3}
            {...commonProps}
          />
        ) : (
          <input
            className="ui-field__input"
            type={props.type ?? "text"}
            {...commonProps}
          />
        )}
      </div>

      {helperText && !error && (
        <p id={helperId} className="ui-field__helper">
          {helperText}
        </p>
      )}

      {error && (
        <p id={errorId} className="ui-field__error">
          {error}
        </p>
      )}
    </div>
  );
}
