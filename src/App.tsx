import { WizardLayout } from './components/wizard/WizardLayout';
import { AccountStep } from './components/registration/AccountStep';
import { ProfileStep } from './components/registration/ProfileStep';
import { PreferencesStep } from './components/registration/PreferencesStep';
import { registrationSchema, type RegistrationData } from './schemas/registrationSchema';

const wizardSteps = [
  {
    id: 'account',
    title: 'Account Credentials',
    description: 'Set up your login details to secure your account.',
    component: <AccountStep />,
    validationFields: ['email', 'password'] as const,
  },
  {
    id: 'profile',
    title: 'Personal Profile',
    description: 'Tell us a bit about yourself.',
    component: <ProfileStep />,
    validationFields: ['firstName', 'lastName'] as const,
  },
  {
    id: 'preferences',
    title: 'Review & Preferences',
    description: 'Customize your experience before finishing up.',
    component: <PreferencesStep />,
    validationFields: ['theme', 'marketingEmails'] as const,
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
    <div className="min-h-screen bg-stone-100 p-4 sm:p-8 flex items-center justify-center font-sans">
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