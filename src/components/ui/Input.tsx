import { forwardRef, type InputHTMLAttributes } from "react";
import { Calendar } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  const isDate = type === "date";

  return (
    <div className="relative w-full">
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-zinc-800 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3c3899] focus-visible:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-red-500",

          isDate && [
            "pr-10",
            "[&::-webkit-calendar-picker-indicator]:absolute",
            "[&::-webkit-calendar-picker-indicator]:right-2",
            "[&::-webkit-calendar-picker-indicator]:w-6",
            "[&::-webkit-calendar-picker-indicator]:h-6",
            "[&::-webkit-calendar-picker-indicator]:opacity-0",
            "[&::-webkit-calendar-picker-indicator]:cursor-pointer",
          ],
          className,
        )}
        {...props}
      />

      {isDate && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <Calendar className="h-4 w-4 text-stone-500" />
        </div>
      )}
    </div>
  );
});
Input.displayName = "Input";
