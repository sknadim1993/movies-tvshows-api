import { z } from 'zod';

export const EntryTypeEnum = z.enum(['Movie', 'TV Show']);

export const createEntrySchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title is too long'),
  type: EntryTypeEnum,
  director: z
    .string()
    .min(1, 'Director is required')
    .max(255, 'Director name is too long'),
  budget: z
    .number()
    .positive('Budget must be a positive number')
    .or(z.string().transform((val) => parseFloat(val))),
  location: z
    .string()
    .min(1, 'Location is required')
    .max(255, 'Location is too long'),
  duration: z
    .number()
    .int('Duration must be an integer')
    .positive('Duration must be positive')
    .or(z.string().transform((val) => parseInt(val, 10))),
  year: z
    .number()
    .int('Year must be an integer')
    .min(1800, 'Year must be after 1800')
    .max(new Date().getFullYear() + 10, 'Year cannot be too far in the future')
    .or(z.string().transform((val) => parseInt(val, 10))),
});

export const updateEntrySchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title is too long')
    .optional(),
  type: EntryTypeEnum.optional(),
  director: z
    .string()
    .min(1, 'Director is required')
    .max(255, 'Director name is too long')
    .optional(),
  budget: z
    .number()
    .positive('Budget must be a positive number')
    .or(z.string().transform((val) => parseFloat(val)))
    .optional(),
  location: z
    .string()
    .min(1, 'Location is required')
    .max(255, 'Location is too long')
    .optional(),
  duration: z
    .number()
    .int('Duration must be an integer')
    .positive('Duration must be positive')
    .or(z.string().transform((val) => parseInt(val, 10)))
    .optional(),
  year: z
    .number()
    .int('Year must be an integer')
    .min(1800, 'Year must be after 1800')
    .max(new Date().getFullYear() + 10, 'Year cannot be too far in the future')
    .or(z.string().transform((val) => parseInt(val, 10)))
    .optional(),
});

export const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, 'Page must be greater than 0'),
  limit: z
    .string()
    .optional()
    .default('10')
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0 && val <= 100, 'Limit must be between 1 and 100'),
});

export const searchSchema = z.object({
  title: z.string().min(1, 'Search query is required'),
});

export type CreateEntryInput = z.infer<typeof createEntrySchema>;
export type UpdateEntryInput = z.infer<typeof updateEntrySchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
