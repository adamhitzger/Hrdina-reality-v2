import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

// Figma: Field / … (label Label/S + Input 54–56 px, border line/200)
const control =
  "w-full rounded border bg-surface-0 px-[18px] text-body-m text-ink-900 placeholder:text-ink-300 outline-none transition-colors focus:border-navy-900 aria-invalid:border-[#b42318]";

function FieldShell({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-label-s text-ink-500">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-body-s text-[#b42318]">
          {error}
        </p>
      )}
    </div>
  );
}

type Base = { name: string; label: string; error?: string; idPrefix?: string };

export function TextField({ name, label, error, idPrefix = "", className = "", ...props }: Base & InputHTMLAttributes<HTMLInputElement>) {
  const id = `${idPrefix}${name}`;
  return (
    <FieldShell id={id} label={label} error={error}>
      <input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${control} h-[54px] lg:h-14 ${error ? "border-[#b42318]" : "border-line-200"} ${className}`}
        {...props}
      />
    </FieldShell>
  );
}

export function TextAreaField({ name, label, error, idPrefix = "", className = "", ...props }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = `${idPrefix}${name}`;
  return (
    <FieldShell id={id} label={label} error={error}>
      <textarea
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${control} min-h-[120px] resize-y py-4 ${error ? "border-[#b42318]" : "border-line-200"} ${className}`}
        {...props}
      />
    </FieldShell>
  );
}

export function SelectField({
  name,
  label,
  error,
  idPrefix = "",
  placeholder,
  options,
  ...props
}: Base & SelectHTMLAttributes<HTMLSelectElement> & { placeholder: string; options: string[] }) {
  const id = `${idPrefix}${name}`;
  return (
    <FieldShell id={id} label={label} error={error}>
      <div className="relative">
        <select
          id={id}
          name={name}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${control} h-[54px] appearance-none pr-10 has-[option[value=""]:checked]:text-ink-300 ${error ? "border-[#b42318]" : "border-line-200"}`}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o} className="text-ink-900">
              {o}
            </option>
          ))}
        </select>
        <span aria-hidden className="pointer-events-none absolute top-1/2 right-[18px] -translate-y-1/2 text-body-s text-ink-300">
          ▾
        </span>
      </div>
    </FieldShell>
  );
}
