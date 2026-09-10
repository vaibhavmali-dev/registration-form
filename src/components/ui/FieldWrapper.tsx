import { type ReactNode } from 'react';

interface FieldWrapperProps {
  label: string;
  error?: string;
  children: ReactNode;
  id?: string;
}

export function FieldWrapper({ label, error, children, id }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-zinc-800">
        {label}
      </label>
      {children}
      {error && <span className="text-[13px] font-medium text-red-600">{error}</span>}
    </div>
  );
}