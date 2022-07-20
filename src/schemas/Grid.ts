import { z } from 'zod';
import { LayoutGrid } from '../types/Grid';

export const GridSchema = z.object({
  color: z.string().min(1)
});

export const LayoutGridSchema: z.ZodSchema<LayoutGrid> = z.object({
  columnWidth: z.number().positive(),
  gutterWidth: z.number().nonnegative(),
  beatHeight: z.number().nonnegative(),
  columnsAmount: z.number().positive(),
  beatMultiplier: z.number().positive(),
  maxWidth: z.number().positive()
});
