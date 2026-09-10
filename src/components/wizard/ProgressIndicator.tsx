import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ProgressIndicatorProps {
  steps: readonly { id: string; title: string }[];
  currentStepIndex: number;
}

export function ProgressIndicator({ steps, currentStepIndex }: ProgressIndicatorProps) {
  return (
    <nav aria-label="Progress" className="mb-12 flex justify-center">
      <ol role="list" className="flex items-center space-x-2 sm:space-x-4">
        {steps.map((step, index) => {
          const isComplete = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isActive = isComplete || isCurrent;

          return (
            <li key={step.id} className="flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] text-xs font-semibold transition-colors",
                    isActive
                      ? "border-[#3c3899] text-[#3c3899]"
                      : "border-stone-300 text-stone-500 bg-transparent"
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {index + 1}
                </div>
                <span 
                  className={cn(
                    "text-sm font-medium hidden sm:block",
                    isActive ? "text-[#3c3899]" : "text-stone-500"
                  )}
                >
                  {step.title}
                </span>
              </div>
              
              {index !== steps.length - 1 && (
                <div
                  className="ml-2 sm:ml-4 h-[1px] w-8 sm:w-16 bg-stone-300 transition-colors"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}