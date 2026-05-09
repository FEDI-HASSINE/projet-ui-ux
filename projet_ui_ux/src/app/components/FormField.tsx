import type { ReactNode } from 'react';

interface FormFieldProps {
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  children: ReactNode;
}

export function FormField({ label, hint, error, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-attt-text-primary">{label}</div>
      {children}
      {error ? (
        <div className="text-xs text-attt-error font-medium">{error}</div>
      ) : hint ? (
        <div className="text-xs text-attt-text-secondary">{hint}</div>
      ) : null}
    </div>
  );
}
