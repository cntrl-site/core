import { z } from 'zod';
import { Section } from './Section.schema';

export const ArticleSchema = z.object({
  id: z.string().min(1),
  sections: z.array(Section),
  height: z.record(z.number().nonnegative()),
  color: z.record(z.nullable(z.string()))
});
