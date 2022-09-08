import { z } from 'zod';
import { PageMetaSchema } from '../metaInfo/MetaInfo.schema';

export const PageSchema = z.object({
  title: z.string(),
  articleId: z.string().min(1),
  slug: z.string(),
  isPublished: z.boolean(),
  meta: PageMetaSchema.optional(),
  enableMeta: z.boolean(),
  id: z.string().min(1)
});
