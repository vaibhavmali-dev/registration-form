import { z } from 'zod';

export const registrationSchema = z.object({
  firstName: z.string().trim().min(1, 'First Name is required'),
  lastName: z.string().trim().optional(),
  gender: z.string().min(1, 'Gender is required'),
  dateOfBirth: z.string()
    .min(1, 'Date of birth is required')
    .refine((date) => new Date(date) <= new Date(), 'Date of birth cannot be in the future'),
  parentFirstName: z.string().trim().min(1, "Mother/Father's First Name is required"),
  parentLastName: z.string().trim().optional(),
  email: z.string().trim().min(1, 'Email is required').email('Valid Email Address is required'),
  pinCode: z.string().regex(/^[1-9][0-9]{5}$/, 'Please enter a valid 6-digit PIN code'),
  country: z.string().min(1, 'Country is required'),
  timeZone: z.string().min(1, 'Time Zone is required'),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Enter a valid phone number with country code'),

  seriesName: z.string().min(1, 'Series Name is required'),
  festival: z.string().min(1, 'Festival selection is required'),
  eventDate: z.string().min(1, 'Date is required'),
  eventTime: z.string().min(1, 'Time is required'),
  showOtherWorkshops: z.boolean().default(false),
  showOtherSeries: z.boolean().default(false),

  subscribePosts: z.enum(['yes', 'no'], { 
    required_error: 'Please indicate your subscription preference',
    invalid_type_error: 'Please indicate your subscription preference'
  }),
});

export type RegistrationData = z.infer<typeof registrationSchema>;