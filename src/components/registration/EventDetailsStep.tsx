import { useFormContext } from 'react-hook-form';
import { FieldWrapper } from '../ui/FieldWrapper';
import { Select } from '../ui/Select';
import type { RegistrationData } from '../../schemas/registrationSchema';

export function EventDetailsStep() {
  const { register, formState: { errors } } = useFormContext<RegistrationData>();

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <div className="w-full md:w-1/2 md:pr-4">
        <FieldWrapper label="Series Name" error={errors.seriesName?.message}>
          <Select {...register('seriesName')} aria-invalid={!!errors.seriesName}>
            <option value="">Select</option>
            <option value="indian_festivals">Indian Festivals</option>
            <option value="global_festivals">Global Festivals</option>
          </Select>
        </FieldWrapper>
      </div>

      <FieldWrapper label="Choose a Festival" error={errors.festival?.message}>
        <div className="flex flex-wrap gap-8 mt-2">
          {['Holi', 'Diwali', 'Dussehra'].map((fest) => (
            <label key={fest} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value={fest}
                {...register('festival')}
                className="h-4 w-4 border-stone-300 accent-[#3c3899] focus:ring-[#3c3899]"
              />
              <span className="text-sm text-zinc-800">{fest}</span>
            </label>
          ))}
        </div>
      </FieldWrapper>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <FieldWrapper label="Date" error={errors.eventDate?.message}>
          <Select {...register('eventDate')} aria-invalid={!!errors.eventDate}>
            <option value="">Select Date</option>
            <option value="2020-10-20">20 October 2020</option>
            <option value="2020-11-14">14 November 2020</option>
          </Select>
        </FieldWrapper>

        <FieldWrapper label="Time" error={errors.eventTime?.message}>
          <Select {...register('eventTime')} aria-invalid={!!errors.eventTime}>
            <option value="">Select Time</option>
            <option value="12:30">12:30 PM IST</option>
            <option value="18:00">06:00 PM IST</option>
          </Select>
        </FieldWrapper>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('showOtherWorkshops')}
            className="h-4 w-4 rounded border-stone-300 accent-[#3c3899] focus:ring-[#3c3899]"
          />
          <span className="text-sm text-zinc-800">Show other workshops in this series</span>
        </label>
        
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('showOtherSeries')}
            className="h-4 w-4 rounded border-stone-300 accent-[#3c3899] focus:ring-[#3c3899]"
          />
          <span className="text-sm text-zinc-800">Show scheduled workshops from other series</span>
        </label>
      </div>
    </div>
  );
}