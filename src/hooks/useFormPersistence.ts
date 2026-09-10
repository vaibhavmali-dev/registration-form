import { useEffect, useRef } from "react";
import type { UseFormReturn, FieldValues } from "react-hook-form";

interface FormPersistenceOptions {
  debounceMs?: number;
  excludeFields?: readonly string[];
}

export function getStoredFormValues<T extends FieldValues>(
  key: string,
  fallback: T,
): T {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.sessionStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return { ...fallback, ...parsed };
  } catch (error) {
    console.warn(`[useFormPersistence] Error reading key "${key}":`, error);
    return fallback;
  }
}

export function clearStoredFormValues(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(key);
  } catch (error) {
    console.warn(`[useFormPersistence] Error clearing key "${key}":`, error);
  }
}

export function useFormPersistence<TFieldValues extends FieldValues>(
  key: string,
  methods: UseFormReturn<TFieldValues>,
  options: FormPersistenceOptions = {},
): void {
  const { debounceMs = 300, excludeFields = [] } = options;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const subscription = methods.watch((values) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        try {
          const sanitizedValues = { ...values };
          excludeFields.forEach((field) => {
            delete sanitizedValues[field];
          });

          window.sessionStorage.setItem(key, JSON.stringify(sanitizedValues));
        } catch (error) {
          console.warn(
            `[useFormPersistence] Error writing key "${key}":`,
            error,
          );
        }
      }, debounceMs);
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [key, methods, debounceMs, excludeFields]);
}
