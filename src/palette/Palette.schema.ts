import { z, ZodType } from 'zod';
import { ColorSchema } from './Color.schema';
import { Palette } from './Palette';

export const PaletteSchema: ZodType<Palette> = z.object({
  id: z.string(),
  projectId: z.string(),
  colors: z.array(ColorSchema)
});
