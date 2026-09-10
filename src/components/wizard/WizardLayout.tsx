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

  useFormPersistence(storageKey, methods);

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
    <div className="mx-auto w-full max-w-2xl rounded-xl bg-[#faf9f6] p-8 shadow-sm border border-stone-200">
      <ProgressIndicator steps={steps} currentStepIndex={currentStepIndex} />
      
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleFinalSubmit)} className="mt-12 flex flex-col gap-6">
          
          <div className="mb-2">
            <h2 
              ref={stepHeaderRef} 
              tabIndex={-1} 
              className="text-xl font-medium text-zinc-900 outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4 focus-visible:ring-offset-[#faf9f6]"
            >
              {currentStep.title}
            </h2>
            {currentStep.description && (
              <p className="mt-1.5 text-sm text-stone-500">{currentStep.description}</p>
            )}
          </div>

          <div className="min-h-[220px]">
            {currentStep.component}
          </div>

          <div className="mt-6 flex justify-between pt-6 border-t border-stone-200">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStepIndex === 0 || isSubmitting}
              className="px-4 py-2 text-sm font-medium text-zinc-700 bg-white border border-stone-300 rounded-md hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
            >
              Back
            </button>

            {isLastStep ? (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 text-sm font-medium text-white bg-zinc-900 rounded-md hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
              >
                {isSubmitting ? 'Processing...' : 'Complete Registration'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2 text-sm font-medium text-white bg-zinc-900 rounded-md hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
              >
                Next Step
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}