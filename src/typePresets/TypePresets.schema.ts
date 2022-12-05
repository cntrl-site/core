import { z, ZodType } from 'zod';
import { TypePresets } from './TypePresets';
import { TypePresetEntrySchema } from './TypePresetEntry.schema';

export const TypePresetsSchema: ZodType<TypePresets> = z.object({
  id: z.string(),
  presets: z.array(TypePresetEntrySchema)
});
