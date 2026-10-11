import { z } from 'zod';

import { APP_CONFIG } from '../constants/config';

const phoneRegex = /^(\+253|253)?[0-9]{8}$/;
const plateRegex = APP_CONFIG.plateRegex;

export const emailSchema = z
  .string()
  .min(1, 'validation.required')
  .email('validation.emailInvalid');

export const passwordSchema = z
  .string()
  .min(6, 'validation.passwordShort');

export const phoneSchema = z
  .string()
  .regex(phoneRegex, 'validation.phoneInvalid');

export const licensePlateSchema = z
  .string()
  .regex(plateRegex, 'validation.plateInvalid');

export const yearSchema = z
  .number()
  .min(1990, 'validation.yearInvalid')
  .max(new Date().getFullYear() + 1, 'validation.yearInvalid');

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z
  .object({
    firstName: z.string().min(2, 'validation.tooShort'),
    lastName: z.string().min(2, 'validation.tooShort'),
    email: emailSchema,
    phone: phoneSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    role: z.enum(['renter', 'owner', 'both']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'validation.passwordsMismatch',
    path: ['confirmPassword'],
  });

export const otpSchema = z.object({
  code: z.string().length(6, 'validation.tooShort').regex(/^\d{6}$/),
});

export const carSchema = z.object({
  brand: z.string().min(1, 'validation.required'),
  model: z.string().min(1, 'validation.required'),
  year: yearSchema,
  color: z.string().min(1, 'validation.required'),
  licensePlate: licensePlateSchema,
  category: z.enum(['suv', 'city', 'luxury', 'family', 'sedan', 'hybrid', 'pickup']),
  transmission: z.enum(['automatic', 'manual']),
  fuel: z.enum(['petrol', 'diesel', 'hybrid', 'electric']),
  seats: z.number().min(1).max(15),
  doors: z.number().min(2).max(5),
  hasAC: z.boolean(),
  isFourWD: z.boolean(),
  pricePerDay: z.number().min(1000, 'validation.tooShort'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type CarFormData = z.infer<typeof carSchema>;

export function isValidDjiboutianPhone(phone: string): boolean {
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function isValidDjiboutianPlate(plate: string): boolean {
  return plateRegex.test(plate.toUpperCase());
}
