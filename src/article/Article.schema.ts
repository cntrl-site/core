import { z } from 'zod';
import { Item } from './ArticleItems.schema';

const Section = z.object({
  id: z.string().min(1),
  items: z.array(Item),
  height: z.record(z.number().nonnegative()),
  visible: z.record(z.boolean())
});

export const ArticleSchema = z.object({
  id: z.string().min(1),
  sections: z.array(Section),
  height: z.record(z.number().positive()),
});
