import { useFormContext } from 'react-hook-form';
import { WizardLayout } from './components/wizard/WizardLayout';
import { registrationSchema, type RegistrationData } from './schemas/registrationSchema';

function AccountStep() {
  const { register, formState: { errors } } = useFormContext<RegistrationData>();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input {...register('email')} className="border p-2 rounded w-full" placeholder="test@example.com" />
        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input {...register('password')} type="password" className="border p-2 rounded w-full" />
        {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
      </div>
    </div>
  );
}

function ProfileStep() {
  const { register, formState: { errors } } = useFormContext<RegistrationData>();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">First Name</label>
        <input {...register('firstName')} className="border p-2 rounded w-full" />
        {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
      </div>
    </div>
  );
}

const wizardSteps = [
  {
    id: 'account',
    title: 'Account Credentials',
    description: 'Set up your login details.',
    component: <AccountStep />,
    validationFields: ['email', 'password'] as const,
  },
  {
    id: 'profile',
    title: 'Personal Profile',
    component: <ProfileStep />,
    validationFields: ['firstName', 'lastName'] as const,
  },
];

const initialData: RegistrationData = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  marketingEmails: false,
  theme: 'system',
};

export default function App() {
  return (
    <div className="min-h-screen bg-stone-100 p-8 flex items-center justify-center">
      <WizardLayout
        steps={wizardSteps}
        defaultValues={initialData}
        storageKey="registration-draft"
        schema={registrationSchema}
        onComplete={async (data) => {
          await new Promise((resolve) => setTimeout(resolve, 1500)); 
          alert(JSON.stringify(data, null, 2));
        }}
      />
    </div>
  );
}