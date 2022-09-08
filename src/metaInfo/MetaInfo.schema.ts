import { z } from 'zod';

const GenericMetaSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  opengraphThumbnail: z.string().optional(),
  keywords: z.string().optional()
});

export const PageMetaSchema = GenericMetaSchema.extend({
  enabled: z.boolean()
})

export const MetaSchema = GenericMetaSchema.extend({
  favicon: z.string().optional()
});
