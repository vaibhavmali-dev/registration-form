import { z } from 'zod';

export const registrationSchema = z.object({
  firstName: z.string().trim().min(1, 'First Name is required'),
  lastName: z.string().trim().optional(),
  gender: z.string().min(1, 'Gender is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  parentFirstName: z.string().trim().min(1, "Mother/Father's First Name is required"),
  parentLastName: z.string().trim().optional(),
  email: z.string().trim().min(1, 'Email is required').email('Valid Email Address is required'),
  pinCode: z.string().trim().min(1, 'Pin Code is required'),
  country: z.string().min(1, 'Country is required'),
  timeZone: z.string().min(1, 'Time Zone is required'),
  phoneNumber: z.string().trim().min(1, 'Phone Number is required'),

  seriesName: z.string().optional(),
  festival: z.string().optional(),
});

export type RegistrationData = z.infer<typeof registrationSchema>;