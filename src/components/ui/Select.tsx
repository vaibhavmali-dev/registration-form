import { forwardRef, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={cn(
            "appearance-none flex h-10 w-full rounded-md border border-stone-300 bg-white px-3 py-2 pr-10 text-sm text-zinc-800 transition-colors cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3c3899] focus-visible:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-red-500",
            className
          )}
          {...props}
        >
          {children}
        </select>
        
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDown className="h-4 w-4 text-stone-500" />
        </div>
      </div>
    );
  }
);
Select.displayName = 'Select';