import { z, ZodType } from 'zod';
import { LayoutGridSchema } from '../grid/Grid.schema';
import { TLayout } from '../index';

export const LayoutSchema = z.object({
  id: z.string(),
  title: z.string(),
  icon: z.string(),
  startsWith: z.number().nonnegative(),
  exemplary: z.number().positive(),
  grid: LayoutGridSchema,
  disabled: z.boolean(),
  locked: z.boolean()
}) satisfies ZodType<TLayout>;
