import { z } from 'zod';

export const PageMetaSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  opengraphThumbnail: z.string().optional(),
  keywords: z.string().optional(),
});

export const MetaSchema = PageMetaSchema.extend({
  favicon: z.string().optional()
});
