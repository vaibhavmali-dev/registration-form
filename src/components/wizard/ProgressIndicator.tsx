import { Check } from 'lucide-react';
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
    <nav aria-label="Progress" className="mb-8 overflow-hidden">
      <ol role="list" className="flex items-center">
        {steps.map((step, index) => {
          const isComplete = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <li 
              key={step.id} 
              className={cn("relative", index !== steps.length - 1 ? "pr-8 sm:pr-20" : "")}
            >
              <div className="flex items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-[1.5px] text-sm font-medium transition-colors",
                    isComplete ? "border-zinc-900 bg-zinc-900 text-white" :
                    isCurrent ? "border-zinc-900 text-zinc-900 bg-white" :
                    "border-stone-300 text-stone-400 bg-transparent"
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isComplete ? <Check className="h-4 w-4" strokeWidth={3} /> : index + 1}
                </div>
                
                {index !== steps.length - 1 && (
                  <div
                    className={cn(
                      "absolute left-8 top-4 -ml-px h-[1.5px] w-[calc(100%-2rem)] sm:w-[calc(100%-2.5rem)] transition-colors",
                      isComplete ? "bg-zinc-900" : "bg-stone-200"
                    )}
                    aria-hidden="true"
                  />
                )}
              </div>
              <span className="absolute -bottom-6 text-xs font-medium text-stone-500 whitespace-nowrap">
                {step.title}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}