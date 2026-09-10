import type { ReactNode } from 'react';
import type { FieldValues, Path } from 'react-hook-form';

export interface WizardStep<TFieldValues extends FieldValues> {
  id: string;
  title: string;
  description?: string;
  component: ReactNode;
  validationFields: readonly Path<TFieldValues>[];
}

export interface WizardProps<TFieldValues extends FieldValues> {
  steps: readonly WizardStep<TFieldValues>[];
  defaultValues: TFieldValues;
  storageKey: string;
  onComplete: (data: TFieldValues) => Promise<void>;
}