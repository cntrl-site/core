import { z, ZodType } from 'zod';
import { Color } from './Color';

export const ColorSchema: ZodType<Color> = z.object({
  id: z.string(),
  name: z.string(),
  rgba: z.string()
});
