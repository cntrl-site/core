import { z } from 'zod';
import { FontFileTypes } from './enums/FontFileTypes';

export const CustomFont = z.object({
  name: z.string().min(1),
  style: z.string().min(1),
  weight: z.number(),
  readonly: z.boolean(),
  weightLabel: z.boolean().optional(),
  files: z.array(
    z.object({
      type: z.nativeEnum(FontFileTypes),
      url: z.string().url()
    })
  )
});

export const FontsSchema = z.object({
  google: z.string(),
  adobe: z.string(),
  custom: z.array(CustomFont)
});
