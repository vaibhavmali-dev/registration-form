import { useState, useRef, useEffect } from 'react';
import { useForm, type DefaultValues, type FieldValues, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodType } from 'zod';
import type { WizardStep } from '../types/wizard';
import { useFormPersistence, getStoredFormValues, clearStoredFormValues } from './useFormPersistence';

export interface UseWizardOptions<TFieldValues extends FieldValues> {
  steps: readonly WizardStep<TFieldValues>[];
  defaultValues: TFieldValues;
  storageKey: string;
  schema: ZodType<TFieldValues>;
  onComplete: (data: TFieldValues) => Promise<void>;
}

export function useWizard<TFieldValues extends FieldValues>({
  steps,
  defaultValues,
  storageKey,
  schema,
  onComplete,
}: UseWizardOptions<TFieldValues>) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const stepHeaderRef = useRef<HTMLHeadingElement>(null);

  const methods = useForm<TFieldValues>({
    resolver: zodResolver(schema),
    defaultValues: getStoredFormValues(storageKey, defaultValues) as DefaultValues<TFieldValues>,
    mode: 'onChange',
  });

  useFormPersistence(storageKey, methods as never);

  useEffect(() => {
    if (stepHeaderRef.current) {
      stepHeaderRef.current.focus();
    }
  }, [currentStepIndex]);

  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleNext = async () => {
    const isStepValid = await methods.trigger(currentStep.validationFields);
    if (isStepValid) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  };

 const handleFinalSubmit: SubmitHandler<TFieldValues> = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      const apiPayload = {
        ...data,
        subscribePosts: data.subscribePosts === 'yes', 
      };

      await onComplete(apiPayload); 
      clearStoredFormValues(storageKey);
      
      methods.reset(defaultValues);
      setCurrentStepIndex(0);
      setResetKey((prev) => prev + 1);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLastStep) {
      await handleNext();
    } else {
      await methods.handleSubmit(handleFinalSubmit)(e);
    }
  };

  return {
    methods,
    currentStepIndex,
    currentStep,
    isLastStep,
    isSubmitting,
    resetKey,
    stepHeaderRef,
    handleBack,
    handleFormSubmit,
    submitError,
  };
}