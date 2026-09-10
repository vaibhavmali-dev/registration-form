import { z } from 'zod';

export const registrationSchema = z.object({
  // --- PAGE 1: GENERAL DETAILS ---
  firstName: z.string().trim().min(1, 'First Name is required'),
  lastName: z.string().trim().optional(),
  
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say'], {
    errorMap: () => ({ message: 'Please select a valid gender' })
  }),
  
  dateOfBirth: z.string()
    .date('Please enter a valid date (YYYY-MM-DD)') 
    .refine((date) => new Date(date) <= new Date(), 'Date of birth cannot be in the future'),
    
  parentFirstName: z.string().trim().min(1, "Mother/Father's First Name is required"),
  parentLastName: z.string().trim().optional(),
  
  email: z.string()
    .trim()
    .min(1, 'Email is required')
    .email('Valid Email Address is required')
    .toLowerCase(), 
    
  pinCode: z.string()
   .regex(/^[A-Za-z0-9\s-]{3,10}$/, 'Please enter a valid postal code'),
    
  country: z.string().min(1, 'Country is required'),
  timeZone: z.string().min(1, 'Time Zone is required'),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Enter a valid phone number with country code'),

  // --- PAGE 2: EVENT DETAILS ---
  seriesName: z.string().min(1, 'Series Name is required'),
  festival: z.string().min(1, 'Festival selection is required'),
  eventDate: z.string().date('Please enter a valid event date'),
  eventTime: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, 'Please enter a valid time (HH:MM)'), 
  
  showOtherWorkshops: z.boolean().default(false),
  showOtherSeries: z.boolean().default(false),

  // --- PAGE 3: PRICING AND SUBMIT ---
  subscribePosts: z.enum(['yes', 'no'], { 
    required_error: 'Please indicate your subscription preference',
  }),
});

export type RegistrationData = z.infer<typeof registrationSchema>;