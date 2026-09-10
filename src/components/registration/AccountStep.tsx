import { useFormContext } from 'react-hook-form';
import { FieldWrapper } from '../ui/FieldWrapper';
import { Input } from '../ui/Input';
import type { RegistrationData } from '../../schemas/registrationSchema';

export function AccountStep() {
  const { register, formState: { errors } } = useFormContext<RegistrationData>();
  
  return (
    <div className="flex flex-col gap-5">
      <FieldWrapper label="Email Address" error={errors.email?.message} id="email">
        <Input 
          {...register('email')} 
          id="email" 
          type="email" 
          placeholder="name@example.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
        />
      </FieldWrapper>

      <FieldWrapper label="Password" error={errors.password?.message} id="password">
        <Input 
          {...register('password')} 
          id="password" 
          type="password" 
          placeholder="••••••••"
          autoComplete="new-password"
          aria-invalid={!!errors.password}
        />
      </FieldWrapper>
    </div>
  );
}