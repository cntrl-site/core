import { Schema, z } from 'zod';
import { ArticleItemType } from '../enums/ArticleItemType';
import { RichTextBlock as TRichTextBlock } from '../types/RichText';
import { ItemBase } from './ItemBase';
import { TextAlign } from '../enums/TextAlign';

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

const RichTextBlock: Schema<TRichTextBlock> = z.lazy(() => (
  z.object({
    start: z.number().nonnegative(),
    end: z.number().nonnegative(),
    type: z.string().min(1),
    entities: z.array(RichTextEntity).optional(),
    children: z.array(RichTextBlock).optional(),
    data: z.any().optional()
  })
));

export const RichTextItem = ItemBase.extend({
  type: z.literal(ArticleItemType.RichText),
  commonParams: z.object({
    sizing: z.string(),
    text: z.string(),
    blocks: z.array(RichTextBlock).optional(),
    styles: z.array(RichTextStyle).optional(),
  }),
  layoutParams: z.record(
    z.object({
      styles: z.array(RichTextStyle).optional(),
      textAlign: z.nativeEnum(TextAlign),
      lineHeightLock: z.boolean()
    })
  )
});
