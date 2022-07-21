import { z } from 'zod';
import { ItemArea } from './ItemArea';

export const Link = z.object({
  url: z.string().url(),
  target: z.string().min(1)
});

const CommonParamsBase = z.object({
  sizing: z.string().min(1),
});

export const ItemBaseSchema = z.object({
  id: z.string().min(1),
  area: z.record(ItemArea),
  visible: z.record(z.boolean()),
  link: Link.optional(),
  commonParams: CommonParamsBase,
  layoutParams: z.record(z.any()).optional()
});
