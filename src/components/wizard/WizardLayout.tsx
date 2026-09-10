import { useState, useRef, useEffect } from 'react';
import { useForm, FormProvider, type FieldValues, type DefaultValues, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodType } from 'zod';
import type { WizardProps } from '../../types/wizard';
import { ProgressIndicator } from './ProgressIndicator';
import { useFormPersistence, getStoredFormValues, clearStoredFormValues } from '../../hooks/useFormPersistence';

export interface ExtendedWizardProps<TFieldValues extends FieldValues> extends WizardProps<TFieldValues> {
  schema: ZodType<TFieldValues>;
}

export function WizardLayout<TFieldValues extends FieldValues>({
  steps,
  defaultValues,
  storageKey,
  schema,
  onComplete,
}: ExtendedWizardProps<TFieldValues>) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      await onComplete(data);
      clearStoredFormValues(storageKey);
      methods.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-zinc-900 mb-2">Let's get you started</h1>
        <p className="text-stone-500">Enter the details to get going</p>
      </div>

      <ProgressIndicator steps={steps} currentStepIndex={currentStepIndex} />
      
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleFinalSubmit)} className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
          <h2 ref={stepHeaderRef} tabIndex={-1} className="sr-only">
            {currentStep.title}
          </h2>

          <div className="min-h-[300px]">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={index === currentStepIndex ? 'block' : 'hidden'}
              >
                {step.component}
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-4">
            {currentStepIndex > 0 && (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="px-8 py-2.5 text-sm font-medium text-zinc-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3c3899] focus-visible:ring-offset-2"
              >
                Back
              </button>
            )}

            {isLastStep ? (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-2.5 text-sm font-medium text-white bg-[#3c3899] rounded-lg hover:bg-[#2d2a75] disabled:opacity-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3c3899] focus-visible:ring-offset-2"
              >
                {isSubmitting ? 'Processing...' : 'Submit'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-10 py-2.5 text-sm font-medium text-white bg-[#3c3899] rounded-lg hover:bg-[#2d2a75] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3c3899] focus-visible:ring-offset-2"
              >
                Next
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}