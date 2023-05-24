import { z, ZodType } from 'zod';
import { ArticleItemType } from './enums/ArticleItemType';
import { RichTextBlock as TRichTextBlock } from './RichText';
import { ItemBaseSchema } from './ItemBase.schema';
import { TextAlign } from './enums/TextAlign';
import { RichTextItem } from './ArticleItems';

export const RichTextEntitySchema = z.object({
  start: z.number().nonnegative(),
  end: z.number().nonnegative(),
  type: z.string(),
  data: z.any().optional()
});

export const RichTextStyleSchema = z.object({
  start: z.number().nonnegative(),
  end: z.number().nonnegative(),
  style: z.string().min(1),
  value: z.string().optional()
});

export const RichTextBlockSchema: z.Schema<TRichTextBlock> = z.lazy(() => (
  z.object({
    start: z.number().nonnegative(),
    end: z.number().nonnegative(),
    type: z.string().min(1),
    entities: z.array(RichTextEntitySchema).optional(),
    children: z.array(RichTextBlockSchema).optional(),
    data: z.any().optional()
  })
));

export const RichTextItemSchema = ItemBaseSchema.extend({
  type: z.literal(ArticleItemType.RichText),
  commonParams: z.object({
    text: z.string(),
    blocks: z.array(RichTextBlockSchema).optional(),
    styles: z.array(RichTextStyleSchema).optional()
  }),
  sticky: z.record(
    z.object({
      from: z.number(),
      to: z.number().optional()
    }).nullable(),
  ),
  layoutParams: z.record(
    z.object({
      preset: z.string().nullable(),
      styles: z.array(RichTextStyleSchema).optional(),
      textAlign: z.nativeEnum(TextAlign),
      lineHeightLock: z.boolean(),
      sizing: z.string()
    })
  )
}) satisfies ZodType<RichTextItem>;
