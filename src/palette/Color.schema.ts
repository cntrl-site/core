import { z, ZodType } from 'zod';
import { Color } from './Color';
import { PaletteColorStatus } from './PaletteColorStatus';

export const ColorSchema: ZodType<Color> = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
  updatedAt: z.number().positive(),
  status: z.nativeEnum(PaletteColorStatus)
});
