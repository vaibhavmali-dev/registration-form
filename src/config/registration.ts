import type { DefaultValues } from 'react-hook-form';
import type { RegistrationData } from '../schemas/registrationSchema';

export const REGISTRATION_CONFIG = {
  options: {
    genders: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' },
      { value: 'prefer_not_to_say', label: 'Prefer not to say' },
    ],
    countries: [
      { value: 'IN', label: 'India' },
      { value: 'US', label: 'United States' },
      { value: 'UK', label: 'United Kingdom' },
    ],
    timeZones: [
      { value: 'IST', label: 'IST - Indian Standard Time - GMT +5:30' },
      { value: 'PST', label: 'PST - Pacific Standard Time - GMT -8:00' },
      { value: 'EST', label: 'EST - Eastern Standard Time - GMT -5:00' },
    ],
    series: [
      { value: 'indian_festivals', label: 'Indian Festivals' },
      { value: 'global_festivals', label: 'Global Festivals' },
    ],
    festivals: [
      { value: 'Holi', label: 'Holi' },
      { value: 'Diwali', label: 'Diwali' },
      { value: 'Dussehra', label: 'Dussehra' },
    ],
    eventDates: [
      { value: '2020-10-20', label: '20 October 2020' },
      { value: '2020-11-14', label: '14 November 2020' },
    ],
    eventTimes: [
      { value: '12:30', label: '12:30 PM IST' },
      { value: '18:00', label: '06:00 PM IST' },
    ],
  },
  pricing: {
    currency: '₹',
    amount: 1000,
  }
};

export const initialRegistrationData: DefaultValues<RegistrationData> = {
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
  subscribePosts: undefined,
};