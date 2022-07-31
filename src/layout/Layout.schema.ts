import { z } from 'zod';
import { Layout } from './Layout';
import { LayoutGridSchema } from '../grid/Grid.schema';

export const LayoutSchema = z.object({
  id: z.string(),
  title: z.string(),
  icon: z.string(),
  startsWith: z.number().nonnegative(),
  exemplary: z.number().positive(),
  grid: LayoutGridSchema
});
