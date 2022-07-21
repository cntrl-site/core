import { z } from 'zod';
import { AdditionalHTML } from './AdditionalHTML';

export const AdditionalHTMLSchema: z.ZodSchema<AdditionalHTML> = z.object({
  head: z.string(),
  afterBodyOpen: z.string(),
  beforeBodyClose: z.string()
});
