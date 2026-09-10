import { useFormContext } from 'react-hook-form';
import { FieldWrapper } from '../ui/FieldWrapper';
import type { RegistrationData } from '../../schemas/registrationSchema';

export function PreferencesStep() {
  const { register, formState: { errors } } = useFormContext<RegistrationData>();
  
  return (
    <div className="flex flex-col gap-8">
      <FieldWrapper label="Interface Theme" error={errors.theme?.message}>
        <div className="flex gap-5 mt-1">
          {['light', 'dark', 'system'].map((theme) => (
            <label key={theme} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                value={theme} 
                {...register('theme')} 
                className="h-4 w-4 border-stone-300 accent-zinc-900 focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
              />
              <span className="text-sm font-medium text-zinc-700 capitalize">{theme}</span>
            </label>
          ))}
        </div>
      </FieldWrapper>

      <div className="flex items-start gap-3 p-4 border border-stone-200 rounded-lg bg-white/40">
        <input 
          type="checkbox" 
          id="marketingEmails"
          {...register('marketingEmails')} 
          className="mt-0.5 h-4 w-4 rounded border-stone-300 accent-zinc-900 focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 cursor-pointer"
        />
        <div className="flex flex-col">
          <label htmlFor="marketingEmails" className="text-sm font-medium text-zinc-900 cursor-pointer">
            Subscribe to updates
          </label>
          <p className="text-[13px] text-stone-500 mt-0.5">
            Receive occasional emails about new features and product updates.
          </p>
        </div>
      </div>
    </div>
  );
}