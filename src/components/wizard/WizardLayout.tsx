import { FormProvider, type FieldValues } from "react-hook-form";
import type { ZodType } from "zod";
import type { WizardProps } from "../../types/wizard";
import { ProgressIndicator } from "./ProgressIndicator";
import { useWizard } from "../../hooks/useForm";

export interface ExtendedWizardProps<
  TFieldValues extends FieldValues,
> extends WizardProps<TFieldValues> {
  schema: ZodType<TFieldValues>;
}

export function WizardLayout<TFieldValues extends FieldValues>(
  props: ExtendedWizardProps<TFieldValues>,
) {
  const {
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
  } = useWizard(props);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-zinc-900 mb-2">
          Let's get you started
        </h1>
        <p className="text-stone-500">Enter the details to get going</p>
      </div>

      <ProgressIndicator
        steps={props.steps}
        currentStepIndex={currentStepIndex}
      />

      <FormProvider {...methods}>
        <form
          key={resetKey}
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-6 w-full max-w-3xl mx-auto"
        >
          <h2 ref={stepHeaderRef} tabIndex={-1} className="sr-only">
            {currentStep.title}
          </h2>

          <div className="min-h-[300px]">
            {props.steps.map((step, index) => (
              <div
                key={step.id}
                className={index === currentStepIndex ? "block" : "hidden"}
              >
                {step.component}
              </div>
            ))}
          </div>

          <div className="mt-2 flex justify-center gap-4">
            {submitError && (
              <div className="text-sm font-medium text-red-600 bg-red-50 py-2 px-4 rounded-md border border-red-200">
                {submitError}
              </div>
            )}

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
                {isSubmitting ? "Processing..." : "Submit"}
              </button>
            ) : (
              <button
                type="submit"
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
