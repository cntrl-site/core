import { z } from 'zod';
import { Layout } from '../types/Layout';
import { LayoutGridSchema } from './Grid';

export const LayoutSchema: z.Schema<Layout> = z.object({
  id: z.string(),
  title: z.string(),
  icon: z.string(),
  startsWith: z.number().nonnegative(),
  exemplary: z.number().positive(),
  grid: LayoutGridSchema
});
