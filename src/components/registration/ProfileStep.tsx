import { useFormContext } from 'react-hook-form';
import { FieldWrapper } from '../ui/FieldWrapper';
import { Input } from '../ui/Input';
import type { RegistrationData } from '../../schemas/registrationSchema';

export function ProfileStep() {
  const { register, formState: { errors } } = useFormContext<RegistrationData>();
  
  return (
    <div className="flex flex-col gap-5 sm:flex-row">
      <div className="flex-1">
        <FieldWrapper label="First Name" error={errors.firstName?.message} id="firstName">
          <Input 
            {...register('firstName')} 
            id="firstName" 
            placeholder="Jane"
            aria-invalid={!!errors.firstName}
          />
        </FieldWrapper>
      </div>
      
      <div className="flex-1">
        <FieldWrapper label="Last Name" error={errors.lastName?.message} id="lastName">
          <Input 
            {...register('lastName')} 
            id="lastName" 
            placeholder="Doe"
            aria-invalid={!!errors.lastName}
          />
        </FieldWrapper>
      </div>
    </div>
  );
}