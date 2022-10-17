import { z } from 'zod';
import { Item } from './ArticleItems.schema';

const Section = z.object({
  id: z.string().min(1),
  items: z.array(Item),
  name: z.string().optional(),
  height: z.record(z.number().nonnegative()),
  position: z.record(z.number()),
  hidden: z.record(z.boolean()),
  color: z.record(z.string()).optional()
});

export const ArticleSchema = z.object({
  id: z.string().min(1),
  sections: z.array(Section),
  height: z.record(z.number().nonnegative()),
});
