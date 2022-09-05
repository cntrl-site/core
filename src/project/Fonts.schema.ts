import { z } from 'zod';
import { CustomFontTypes } from './Fonts';

const CustomFont = z.object({
  name: z.string().min(1),
  style: z.string().min(1),
  weight: z.number(),
  files: z.array(
    z.object({
      type: z.nativeEnum(CustomFontTypes),
      url: z.string().url()
    })
  )
});

export const FontsSchema = z.object({
  google: z.string(),
  adobe: z.string(),
  custom: z.array(CustomFont)
});
