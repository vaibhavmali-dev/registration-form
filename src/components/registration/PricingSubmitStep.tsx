import { useFormContext } from 'react-hook-form';
import { REGISTRATION_CONFIG } from '../../config/registration';
import type { RegistrationData } from '../../schemas/registrationSchema';

export function PricingSubmitStep() {
  const { register, formState: { errors } } = useFormContext<RegistrationData>();
  const { currency, amount } = REGISTRATION_CONFIG.pricing;

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] p-8 text-left">
        <h3 className="text-lg font-semibold text-zinc-900 mb-1">Sub Total</h3>
        <p className="text-sm text-stone-500 mb-6">Your sub total is as below</p>
        
        <div className="flex justify-between items-center py-2">
          <span className="text-sm font-medium text-zinc-800">Price</span>
          <span className="text-sm font-medium text-zinc-800">{currency}{amount}</span>
        </div>
        
        <div className="border-t border-dashed border-stone-300 my-3"></div>
        
        <div className="flex justify-between items-center py-2">
          <span className="text-base font-bold text-zinc-900">Total</span>
          <span className="text-base font-bold text-[#2d9a5b]">{currency}{amount}</span>
        </div>
      </div>

      <div className="w-full max-w-md flex flex-col gap-4 text-left">
        <p className="text-sm font-medium text-zinc-800">
          I wish to subscribe to Simple Plan's posts
        </p>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              value="yes"
              {...register('subscribePosts')}
              className="h-4 w-4 border-stone-300 accent-[#3c3899] focus:ring-[#3c3899]"
            />
            <span className="text-sm text-zinc-800">Yes</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              value="no"
              {...register('subscribePosts')}
              className="h-4 w-4 border-stone-300 accent-[#3c3899] focus:ring-[#3c3899]"
            />
            <span className="text-sm text-zinc-800">No</span>
          </label>
        </div>
        {errors.subscribePosts && (
          <span className="text-[13px] font-medium text-red-600">{errors.subscribePosts.message}</span>
        )}
        
        <p className="text-xs text-stone-500 mt-2 leading-relaxed">
          *By clicking on 'Yes' you give Simple Plan the permission to send you information and updates about Simple Plan via Whatsapp and email
        </p>
      </div>
    </div>
  );
}