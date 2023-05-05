import { z, ZodType } from 'zod';
import { ArticleItemType } from './enums/ArticleItemType';
import { RichTextBlock as TRichTextBlock } from './RichText';
import { ItemBaseSchema } from './ItemBase.schema';
import { TextAlign } from './enums/TextAlign';
import { RichTextItem } from './ArticleItems';

const RichTextEntity = z.object({
  start: z.number().nonnegative(),
  end: z.number().nonnegative(),
  type: z.string(),
  data: z.any().optional()
});

const RichTextStyle = z.object({
  start: z.number().nonnegative(),
  end: z.number().nonnegative(),
  style: z.string().min(1),
  value: z.string().optional()
});

const RichTextBlock: z.Schema<TRichTextBlock> = z.lazy(() => (
  z.object({
    start: z.number().nonnegative(),
    end: z.number().nonnegative(),
    type: z.string().min(1),
    entities: z.array(RichTextEntity).optional(),
    children: z.array(RichTextBlock).optional(),
    data: z.any().optional()
  })
));

export const RichTextItemSchema = ItemBaseSchema.extend({
  type: z.literal(ArticleItemType.RichText),
  commonParams: z.object({
    text: z.string(),
    blocks: z.array(RichTextBlock).optional(),
    styles: z.array(RichTextStyle).optional()
  }),
  layoutParams: z.record(
    z.object({
      preset: z.string().nullable(),
      styles: z.array(RichTextStyle).optional(),
      textAlign: z.nativeEnum(TextAlign),
      lineHeightLock: z.boolean(),
      sizing: z.string(),
      sticky: z.object({
        from: z.number(),
        to: z.number().optional()
      }).nullable()
    })
  )
}) satisfies ZodType<RichTextItem>;
