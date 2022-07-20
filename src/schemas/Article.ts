import { z } from 'zod';
import { Item } from './ArticleItems';

const Section = z.object({
  id: z.string().min(1),
  items: z.array(Item),
  height: z.record(z.number().positive()),
  visible: z.record(z.boolean())
});

export const ArticleSchema = z.object({
  id: z.string().min(1),
  sections: z.array(Section)
});
