import { useFormContext } from 'react-hook-form';
import { FieldWrapper } from '../ui/FieldWrapper';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import type { RegistrationData } from '../../schemas/registrationSchema';

export function GeneralDetailsStep() {
  const { register, formState: { errors } } = useFormContext<RegistrationData>();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      <FieldWrapper label="First Name*" error={errors.firstName?.message}>
        <Input {...register('firstName')} placeholder="Enter your First Name" aria-invalid={!!errors.firstName} />
      </FieldWrapper>

      <FieldWrapper label="Last Name" error={errors.lastName?.message}>
        <Input {...register('lastName')} placeholder="Enter your Last Name" aria-invalid={!!errors.lastName} />
      </FieldWrapper>

      <FieldWrapper label="Gender*" error={errors.gender?.message}>
        <Select {...register('gender')} aria-invalid={!!errors.gender}>
        <option value="" disabled>Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer_not_to_say">Prefer not to say</option>
        </Select>
      </FieldWrapper>

      <FieldWrapper label="Date of Birth*" error={errors.dateOfBirth?.message}>
        <Input {...register('dateOfBirth')} type="date" aria-invalid={!!errors.dateOfBirth} />
      </FieldWrapper>

      <FieldWrapper label="Mother/Father's First Name*" error={errors.parentFirstName?.message}>
        <Input {...register('parentFirstName')} placeholder="Enter First Name" aria-invalid={!!errors.parentFirstName} />
      </FieldWrapper>

      <FieldWrapper label="Last Name" error={errors.parentLastName?.message}>
        <Input {...register('parentLastName')} placeholder="Enter Last Name" aria-invalid={!!errors.parentLastName} />
      </FieldWrapper>

      <FieldWrapper label="Email Address*" error={errors.email?.message}>
        <Input {...register('email')} type="email" placeholder="Enter your Email Address" aria-invalid={!!errors.email} />
      </FieldWrapper>

      <div className="hidden md:block"></div>

      <FieldWrapper label="Pin Code*" error={errors.pinCode?.message}>
        <Input {...register('pinCode')} placeholder="Enter your area's Pin Code" aria-invalid={!!errors.pinCode} />
      </FieldWrapper>

      <FieldWrapper label="Country*" error={errors.country?.message}>
        <Select {...register('country')} aria-invalid={!!errors.country}>
          <option value="" disabled>Select</option>
          <option value="IN">India</option>
          <option value="US">United States</option>
          <option value="UK">United Kingdom</option>
        </Select>
      </FieldWrapper>

      <FieldWrapper label="Time Zone*" error={errors.timeZone?.message}>
        <Select {...register('timeZone')} aria-invalid={!!errors.timeZone}>
          <option value="" disabled>Select</option>
          <option value="IST">IST - Indian Standard Time - GMT +5:30</option>
          <option value="PST">PST - Pacific Standard Time - GMT -8:00</option>
          <option value="EST">EST - Eastern Standard Time - GMT -5:00</option>
        </Select>
      </FieldWrapper>

      <FieldWrapper label="Phone Number (include country code)*" error={errors.phoneNumber?.message}>
        <Input {...register('phoneNumber')} placeholder="+919876543210" aria-invalid={!!errors.phoneNumber} />
      </FieldWrapper>
    </div>
  );
}