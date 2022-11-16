import { z } from 'zod';
import { Item } from './ArticleItems.schema';
import { SectionHeightMode } from './enums/SectionHeightMode';

const SectionHeight = z.object({
  mode: z.nativeEnum(SectionHeightMode),
  units: z.number().nonnegative(),
  viewportHeight: z.number().optional()
})

export const Section = z.object({
  id: z.string().min(1),
  items: z.array(Item),
  name: z.string().optional(),
  height: z.record(SectionHeight),
  position: z.record(z.number()),
  hidden: z.record(z.boolean()),
  color: z.record(z.nullable(z.string()))
});
