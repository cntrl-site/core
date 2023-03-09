import { z, ZodType } from 'zod';
import { TypePresetEntry } from './TypePresetEntry';

export const TypePresetEntrySchema: ZodType<TypePresetEntry> = z.object({
  id: z.string(),
  name: z.string(),
  fontFamily: z.string(),
  fontStyle: z.string(),
  fontWeight: z.string(),
  fontSize: z.number(),
  lineHeight: z.number(),
  letterSpacing: z.number(),
  wordSpacing: z.number(),
  color: z.string()
});
