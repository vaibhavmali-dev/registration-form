import { useFormContext } from 'react-hook-form';
import { FieldWrapper } from '../ui/FieldWrapper';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { REGISTRATION_CONFIG } from '../../config/registration';
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
          {REGISTRATION_CONFIG.options.genders.map((gender) => (
            <option key={gender.value} value={gender.value}>{gender.label}</option>
          ))}
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
          {REGISTRATION_CONFIG.options.countries.map((country) => (
            <option key={country.value} value={country.value}>{country.label}</option>
          ))}
        </Select>
      </FieldWrapper>

      <FieldWrapper label="Time Zone*" error={errors.timeZone?.message}>
        <Select {...register('timeZone')} aria-invalid={!!errors.timeZone}>
          <option value="" disabled>Select</option>
          {REGISTRATION_CONFIG.options.timeZones.map((tz) => (
            <option key={tz.value} value={tz.value}>{tz.label}</option>
          ))}
        </Select>
      </FieldWrapper>

      <FieldWrapper label="Phone Number (include country code)*" error={errors.phoneNumber?.message}>
        <Input {...register('phoneNumber')} placeholder="+919876543210" aria-invalid={!!errors.phoneNumber} />
      </FieldWrapper>
    </div>
  );
}