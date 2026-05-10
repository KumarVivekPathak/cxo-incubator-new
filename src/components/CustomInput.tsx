import React from "react";

type BaseProps = {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
  className?: string;
};

type InputProps = BaseProps & {
  type?: "input";
  inputType?: string;
  placeholder?: string;
};

type SelectProps = BaseProps & {
  type: "select";
  options: readonly string[];
  placeholder?: string;
};

type CustomInputProps = InputProps | SelectProps;

export default function CustomInput(props: CustomInputProps) {
  const {
    label,
    name,
    value,
    onChange,
    onBlur,
    error,
    touched,
    required,
    className = "",
  } = props;

  const showError = !!error && touched;

  const baseInputClass =
    "w-full px-4 py-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 transition-all duration-200 bg-white rounded-sm border";

  const inputClass = `${baseInputClass} ${
    showError
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
      : "border-maroon/70 focus:border-gold focus:ring-gold/20"
  } ${className}`;

  const labelClass =
    "block text-xs font-bold tracking-[2px] capitalize text-maroon mb-2";

  return (
    <div>
      <label className={labelClass}>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      {props.type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={inputClass}
          aria-invalid={showError}
          aria-describedby={showError ? `${name}-error` : undefined}
        >
          <option value="" disabled>
            {props.placeholder}
          </option>

          {props.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          type={props.inputType || "text"}
          placeholder={props.placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={inputClass}
          aria-invalid={showError}
          aria-describedby={showError ? `${name}-error` : undefined}
        />
      )}

      <div className="min-h-[20px] mt-1">
        {showError && (
          <p id={`${name}-error`} className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}