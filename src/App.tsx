import { WizardLayout } from './components/wizard/WizardLayout';
import { GeneralDetailsStep } from './components/registration/GeneralDetailsStep';
import { EventDetailsStep } from './components/registration/EventDetailsStep';
import { PricingSubmitStep } from './components/registration/PricingSubmitStep';
import { registrationSchema, type RegistrationData } from './schemas/registrationSchema';

const wizardSteps = [
  {
    id: 'general',
    title: 'General Details',
    component: <GeneralDetailsStep />,
    validationFields: [
      'firstName', 'lastName', 'gender', 'dateOfBirth', 
      'parentFirstName', 'parentLastName', 'email', 
      'pinCode', 'country', 'timeZone', 'phoneNumber'
    ] as const,
  },
  {
    id: 'event',
    title: 'Event Details',
    component: <EventDetailsStep />,
    validationFields: ['seriesName', 'festival', 'eventDate', 'eventTime'] as const,
  },
  {
    id: 'pricing',
    title: 'Pricing and Submit',
    component: <PricingSubmitStep />,
    validationFields: ['subscribePosts'] as const,
  },
];

const initialData: RegistrationData = {
  firstName: '',
  lastName: '',
  gender: '',
  dateOfBirth: '',
  parentFirstName: '',
  parentLastName: '',
  email: '',
  pinCode: '',
  country: '',
  timeZone: '',
  phoneNumber: '',
  seriesName: '',
  festival: '',
  eventDate: '',
  eventTime: '',
  showOtherWorkshops: false,
  showOtherSeries: false,
  subscribePosts: undefined as unknown as 'yes' | 'no',
};

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eff3ff] via-[#ffffff] to-[#fff5ea] p-4 sm:p-12 font-sans selection:bg-[#3c3899] selection:text-white">
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