import { z } from 'zod';
import { Page } from './Page';
import { PageMetaSchema } from '../metaInfo/MetaInfo.schema';

export const PageSchema: z.Schema<Page> = z.object({
  title: z.string(),
  articleId: z.string().min(1),
  slug: z.string(),
  isPublished: z.boolean(),
  meta: PageMetaSchema.optional(),
  id: z.string().min(1)
});
